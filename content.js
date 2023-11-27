const findClickedElementPath = (event) => {
  event.preventDefault(); // 阻止浏览器默认行为
  // console.log('Function started');
  if (!event.altKey) {
    // console.log('Alt key not pressed, exiting function');
    return;
  }

  // 移除上一个对话框
  const oldDialogBox = document.querySelector('.custom-dialog-box');
  if (oldDialogBox) {
    document.body.removeChild(oldDialogBox);
  }

  const clickedElement = event.target;
  if (!clickedElement) {
    // console.log('No clicked element found, exiting function');
    return;
  }

  const elementPath = [];
  let currentElement = clickedElement;

  while (currentElement) {
    const tagName = currentElement.tagName.toLowerCase();
    const className = currentElement.className;
    const id = currentElement.id;

    let elementInfo = `<${tagName}`;
    if (className) {
      elementInfo += ` class="${className}"`;
    }
    if (id) {
      elementInfo += ` id="${id}"`;
    }
    elementInfo += '> ➡️\n';

    elementPath.unshift(elementInfo);

    currentElement = currentElement.parentElement;
  }

  const elementContent = clickedElement.innerText.trim();

  const fullPath = `👻 ${elementPath.join('👻 ')}`;

  // 创建自定义弹出框
  const dialogBox = document.createElement('div');
  dialogBox.classList.add('custom-dialog-box'); // 添加自定义样式类

  const pathTitle = document.createElement('h3');
  pathTitle.textContent = 'Path';
  pathTitle.style.color = '#E66E50';
  dialogBox.appendChild(pathTitle);

  // 创建代码块
  const codeElement = document.createElement('code');
  codeElement.textContent = fullPath;
  codeElement.style.marginBottom = '20px';
  dialogBox.appendChild(codeElement);

  const contenTitle = document.createElement('h3');
  contenTitle.textContent = 'Element Content';
  contenTitle.style.color = '#E66E50';
  dialogBox.appendChild(contenTitle);

  const codeContent = document.createElement('code');
  codeContent.textContent = elementContent;
  dialogBox.appendChild(codeContent);

  // 根据鼠标点击位置设置弹出窗口位置
  dialogBox.style.position = 'fixed';
  dialogBox.style.zIndex = '9999';

  // 计算初始位置，考虑页面滚动的影响
  const initialX = event.clientX + window.scrollX;
  const initialY = event.clientY + window.scrollY;

  dialogBox.style.left = `${initialX}px`;
  dialogBox.style.top = `${initialY}px`;

  let isDragging = false;
  let offsetX, offsetY;

  // 鼠标按下时记录初始位置（相对于对话框）
  dialogBox.addEventListener('mousedown', (e) => {
    if (e.target.tagName.toLowerCase() === 'code') {
      isDragging = false;
      return;
    }
    isDragging = true;

    // 记录鼠标相对于对话框的初始位置
    const dialogRect = dialogBox.getBoundingClientRect();
    offsetX = e.clientX - (dialogRect.left + dialogRect.width / 2);
    offsetY = e.clientY - (dialogRect.top + dialogRect.height / 2);
  });

  // 在文档上添加鼠标移动事件，根据拖动更新对话框位置
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      dialogBox.style.left = e.clientX - offsetX + 'px';
      dialogBox.style.top = e.clientY - offsetY + 'px';
    }
  });

  // 鼠标松开时停止拖动
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 添加关闭按钮
  const closeButton = document.createElement('button');
  closeButton.textContent = '关闭 🌙';

  closeButton.style.backgroundColor = '#3399ff';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';

  closeButton.style.position = 'absolute';
  closeButton.style.right = '10px';
  closeButton.style.bottom = '10px'; // 调整垂直位置

  closeButton.addEventListener('click', () => {
    document.body.removeChild(dialogBox);
  });
  dialogBox.appendChild(closeButton);

  // 将弹出框添加到页面
  document.body.appendChild(dialogBox);

  setTimeout(() => {
    const computedStyles = window.getComputedStyle(dialogBox);
    // console.log('Width:', computedStyles.width);
    // console.log('Height:', computedStyles.height);
    // console.log('Background Color:', computedStyles.backgroundColor);
  }, 1000);

  // console.log('Function ended');
}

document.addEventListener('click', findClickedElementPath);
