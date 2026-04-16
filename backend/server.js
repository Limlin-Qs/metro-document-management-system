const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
const metadataPath = path.join(__dirname, 'metadata.json');
fs.ensureDirSync(uploadDir);
if (!fs.existsSync(metadataPath)) {
  fs.writeJsonSync(metadataPath, { documents: [] });
}

// Configure multer for file upload - fix Chinese filename encoding
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 对文件名进行正确的编码处理，避免中文乱码
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + originalName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Helper functions
const readMetadata = () => fs.readJsonSync(metadataPath);
const writeMetadata = (data) => fs.writeJsonSync(metadataPath, data, { spaces: 2 });

// API Routes

// Get all documents
app.get('/api/documents', (req, res) => {
  const metadata = readMetadata();
  res.json(metadata.documents);
});

// Upload a new document
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Fix Chinese filename encoding
  const originalName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
  
  const metadata = readMetadata();
  const document = {
    id: Date.now().toString(),
    filename: originalName,
    storedName: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
    uploadDate: new Date().toISOString(),
    category: req.body.category || 'Uncategorized',
    description: req.body.description || ''
  };

  metadata.documents.unshift(document);
  writeMetadata(metadata);

  res.json({ success: true, document });
});

// Delete a document
app.delete('/api/documents/:id', (req, res) => {
  const metadata = readMetadata();
  const documentId = req.params.id;
  const documentIndex = metadata.documents.findIndex(d => d.id === documentId);

  if (documentIndex === -1) {
    return res.status(404).json({ error: 'Document not found' });
  }

  const document = metadata.documents[documentIndex];
  const filePath = path.join(uploadDir, document.storedName);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  metadata.documents.splice(documentIndex, 1);
  writeMetadata(metadata);

  res.json({ success: true });
});

// Update document info
app.put('/api/documents/:id', (req, res) => {
  const metadata = readMetadata();
  const documentId = req.params.id;
  const document = metadata.documents.find(d => d.id === documentId);

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  document.category = req.body.category || document.category;
  document.description = req.body.description || document.description;

  writeMetadata(metadata);
  res.json({ success: true, document });
});

// Download document
app.get('/api/download/:id', (req, res) => {
  const metadata = readMetadata();
  const document = metadata.documents.find(d => d.id === req.params.id);

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  const filePath = path.join(uploadDir, document.storedName);
  res.download(filePath, document.filename);
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const metadata = readMetadata();
  const categories = [...new Set(metadata.documents.map(d => d.category))];
  res.json(categories.sort());
});

// Serve index.html for all non-API routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server - listen on all interfaces for LAN access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`局域网访问: 在浏览器打开 http://<你的电脑IP>:${PORT}/api`);
  console.log(`前端需要修改 API_BASE_URL 为你的IP地址`);
});
