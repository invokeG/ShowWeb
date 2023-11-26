// const findClosestWebComponents = (event) => {
//     console.log('Function started');
//     if(!event.altKey){
//         console.log('Alt key not pressed, exiting function');
//         return;
//     }
//     const host = event.composedPath()[0].getRootNode().host
//     if(!host){
//         console.log('No host found, exiting function');
//         return;
//     }
//     alert(host.outerHTML)
// }

// document.addEventListener('click', findClosestWebComponents)
const findClickedElementPath = (event) => {
    console.log('Function started');
    if (!event.altKey) {
      console.log('Alt key not pressed, exiting function');
      return;
    }
  
    const clickedElement = event.target;
    if (!clickedElement) {
      console.log('No clicked element found, exiting function');
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
      elementInfo += '>';
  
      elementPath.unshift(elementInfo);
  
      currentElement = currentElement.parentElement;
    }
  
    const fullPath = elementPath.join(' ➡️ ');
    const codeBlock = document.createElement('code');
    codeBlock.textContent = fullPath;
    document.body.appendChild(codeBlock);
  

    // alert(`Clicked element path: ${fullPath}`);
    console.log('Function ended');
  }
  
document.addEventListener('click', findClickedElementPath);
  
  
  