// Configuration
const API_BASE_URL = '/api';

// State
let documents = [];
let categories = [];
let currentCategory = 'all';
let searchQuery = '';
let selectedFiles = [];

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const uploadForm = document.getElementById('uploadForm');
const uploadBtn = document.getElementById('uploadBtn');
const filePreview = document.getElementById('filePreview');
const fileList = document.getElementById('fileList');
const documentsContainer = document.getElementById('documentsContainer');
const categoryList = document.getElementById('categoryList');
const searchInput = document.getElementById('searchInput');
const totalDocs = document.getElementById('totalDocs');
const totalCategories = document.getElementById('totalCategories');
const currentFilter = document.getElementById('currentFilter');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadDocuments();
  loadCategories();

  // Drag and drop
  dropZone.addEventListener('dragover', handleDragOver);
  dropZone.addEventListener('dragleave', handleDragLeave);
  dropZone.addEventListener('drop', handleDrop);
  selectFileBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleFileSelect);
  uploadForm.addEventListener('submit', handleUpload);
  searchInput.addEventListener('input', handleSearch);
  editForm.addEventListener('submit', handleEditSubmit);
  document.getElementById('closeModal').addEventListener('click', closeEditModal);
  document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
  editModal.addEventListener('click', (e) => {
    if (e.target === editModal) closeEditModal();
  });
});

// File Handling
function handleDragOver(e) {
  e.preventDefault();
  dropZone.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  dropZone.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
}

function handleFileSelect(e) {
  handleFiles(e.target.files);
}

function handleFiles(files) {
  selectedFiles = Array.from(files);
  if (selectedFiles.length > 0) {
    uploadBtn.disabled = false;
    filePreview.classList.remove('hidden');
    renderFileList();
  } else {
    uploadBtn.disabled = true;
    filePreview.classList.add('hidden');
  }
}

function renderFileList() {
  fileList.innerHTML = '';
  selectedFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between bg-gray-50 p-2 rounded';
    item.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="${getFileIcon(file.type)} text-gray-500"></i>
        <div>
          <p class="font-medium text-sm text-gray-700">${file.name}</p>
          <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
        </div>
      </div>
      <button 
        type="button" 
        onclick="removeFile(${index})" 
        class="text-red-500 hover:text-red-700"
      >
        <i class="fas fa-times"></i>
      </button>
    `;
    fileList.appendChild(item);
  });
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  if (selectedFiles.length === 0) {
    uploadBtn.disabled = true;
    filePreview.classList.add('hidden');
  } else {
    renderFileList();
  }
}

async function handleUpload(e) {
  e.preventDefault();
  
  const category = document.getElementById('categoryInput').value.trim() || 'Uncategorized';
  const description = document.getElementById('descriptionInput').value.trim();

  uploadBtn.disabled = true;
  uploadBtn.innerHTML = '<i class="fas fa-spinner spin"></i> 上传中...';

  try {
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('description', description);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
    }

    // Reset form
    selectedFiles = [];
    fileInput.value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('descriptionInput').value = '';
    filePreview.classList.add('hidden');
    
    await loadDocuments();
    await loadCategories();
    
    showNotification('上传成功！', 'success');
  } catch (error) {
    console.error('Upload error:', error);
    showNotification('上传失败，请重试', 'error');
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.innerHTML = '<i class="fas fa-upload"></i> 开始上传';
  }
}

// Data loading
async function loadDocuments() {
  try {
    const response = await fetch(`${API_BASE_URL}/documents`);
    documents = await response.json();
    renderDocuments();
    updateStats();
  } catch (error) {
    console.error('Failed to load documents:', error);
    documentsContainer.innerHTML = '<div class="text-center py-12 text-red-500">加载失败，请检查后端服务是否启动</div>';
  }
}

async function loadCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    categories = await response.json();
    renderCategories();
    updateStats();
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

// Rendering
function renderCategories() {
  categoryList.innerHTML = '<div class="category-item active" data-category="all"><i class="fas fa-list"></i> 全部文档</div>';
  
  categories.forEach(category => {
    const div = document.createElement('div');
    div.className = `category-item ${currentCategory === category ? 'active' : ''}`;
    div.dataset.category = category;
    div.innerHTML = `<i class="fas fa-folder"></i> ${category}`;
    div.addEventListener('click', () => {
      currentCategory = category;
      document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
      div.classList.add('active');
      updateFilter();
      renderDocuments();
    });
    categoryList.appendChild(div);
  });

  // Add click event for "all"
  categoryList.querySelector('[data-category="all"]').addEventListener('click', () => {
    currentCategory = 'all';
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    categoryList.querySelector('[data-category="all"]').classList.add('active');
    updateFilter();
    renderDocuments();
  });
}

function getFilteredDocuments() {
  let filtered = documents;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(d => d.category === currentCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(d => 
      d.filename.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    );
  }

  return filtered;
}

function renderDocuments() {
  const filtered = getFilteredDocuments();

  if (filtered.length === 0) {
    documentsContainer.innerHTML = `
      <div class="text-center py-12 text-gray-500">
        <i class="fas fa-inbox text-6xl mb-4 text-gray-300"></i>
        <p>没有找到匹配的文档</p>
      </div>
    `;
    return;
  }

  documentsContainer.innerHTML = '';
  filtered.forEach(doc => {
    const card = createDocumentCard(doc);
    documentsContainer.appendChild(card);
  });
}

function createDocumentCard(doc) {
  const div = document.createElement('div');
  div.className = 'document-card';
  const iconClass = getFileIconClass(doc.mimetype);
  const uploadDate = new Date(doc.uploadDate).toLocaleString('zh-CN');

  div.innerHTML = `
    <div class="flex items-start justify-between">
      <div class="flex items-start space-x-4">
        <div class="file-icon ${iconClass}">
          <i class="${getFileIcon(doc.mimetype)}"></i>
        </div>
        <div>
          <h4 class="font-semibold text-gray-800 mb-1">${doc.filename}</h4>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">${doc.category}</span>
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">${formatFileSize(doc.size)}</span>
          </div>
          ${doc.description ? `<p class="text-sm text-gray-600 mb-1">${doc.description}</p>` : ''}
          <p class="text-xs text-gray-400">上传于 ${uploadDate}</p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button 
          onclick="editDocument('${doc.id}')" 
          class="p-2 text-blue-600 hover:bg-blue-50 rounded"
          title="编辑"
        >
          <i class="fas fa-edit"></i>
        </button>
        <button 
          onclick="downloadDocument('${doc.id}')" 
          class="p-2 text-green-600 hover:bg-green-50 rounded"
          title="下载"
        >
          <i class="fas fa-download"></i>
        </button>
        <button 
          onclick="deleteDocument('${doc.id}')" 
          class="p-2 text-red-600 hover:bg-red-50 rounded"
          title="删除"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `;

  return div;
}

function updateStats() {
  totalDocs.textContent = documents.length;
  totalCategories.textContent = categories.length;
}

function updateFilter() {
  if (currentCategory === 'all' && !searchQuery) {
    currentFilter.textContent = '显示全部';
  } else {
    const parts = [];
    if (currentCategory !== 'all') parts.push(`分类: ${currentCategory}`);
    if (searchQuery) parts.push(`搜索: "${searchQuery}"`);
    currentFilter.textContent = parts.join(' · ');
  }
}

// Actions
function editDocument(id) {
  const doc = documents.find(d => d.id === id);
  if (!doc) return;

  document.getElementById('editDocumentId').value = doc.id;
  document.getElementById('editFilename').value = doc.filename;
  document.getElementById('editCategory').value = doc.category;
  document.getElementById('editDescription').value = doc.description;
  
  editModal.classList.remove('hidden');
  editModal.classList.add('flex');
}

function closeEditModal() {
  editModal.classList.add('hidden');
  editModal.classList.remove('flex');
}

async function handleEditSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById('editDocumentId').value;
  const category = document.getElementById('editCategory').value.trim();
  const description = document.getElementById('editDescription').value.trim();

  try {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, description })
    });

    if (!response.ok) throw new Error('Update failed');

    closeEditModal();
    await loadDocuments();
    await loadCategories();
    showNotification('更新成功！', 'success');
  } catch (error) {
    console.error('Update error:', error);
    showNotification('更新失败', 'error');
  }
}

function downloadDocument(id) {
  window.open(`${API_BASE_URL}/download/${id}`, '_blank');
}

async function deleteDocument(id) {
  if (!confirm('确定要删除这个文档吗？删除后无法恢复。')) return;

  try {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Delete failed');

    await loadDocuments();
    await loadCategories();
    showNotification('删除成功', 'success');
  } catch (error) {
    console.error('Delete error:', error);
    showNotification('删除失败', 'error');
  }
}

function handleSearch(e) {
  searchQuery = e.target.value.trim();
  updateFilter();
  renderDocuments();
}

// Utility functions
function getFileIcon(mimetype) {
  if (mimetype.includes('pdf')) return 'fas fa-file-pdf';
  if (mimetype.includes('word') || mimetype.includes('document')) return 'fas fa-file-word';
  if (mimetype.includes('excel') || mimetype.includes('sheet')) return 'fas fa-file-excel';
  if (mimetype.includes('image')) return 'fas fa-file-image';
  if (mimetype.includes('text')) return 'fas fa-file-alt';
  if (mimetype.includes('zip') || mimetype.includes('rar')) return 'fas fa-file-archive';
  if (mimetype.includes('video')) return 'fas fa-file-video';
  if (mimetype.includes('audio')) return 'fas fa-file-audio';
  return 'fas fa-file';
}

function getFileIconClass(mimetype) {
  if (mimetype.includes('pdf')) return 'file-pdf';
  if (mimetype.includes('word') || mimetype.includes('document')) return 'file-word';
  if (mimetype.includes('excel') || mimetype.includes('sheet')) return 'file-excel';
  if (mimetype.includes('image')) return 'file-image';
  return 'file-other';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transition = 'opacity 0.5s, transform 0.5s';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-10px)';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}
