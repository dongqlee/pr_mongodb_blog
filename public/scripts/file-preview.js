const filePickerElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('image-preview');

function showPreview() {
  const files = filePickerElement.files;
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  const pickedFile = files[0];
  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  //방문자의 컴퓨터에서만 작동하는 로컬 url 생성, 소스로 사용
  imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change', showPreview);