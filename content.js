const targetNode = document;
const config = {childList: true, subtree: true};

const convertRelativeTimeToAbsoluteTime = (node) => {
  const relativeTimeElements = node.getElementsByTagName("relative-time");
  for (let i = 0; i < relativeTimeElements.length; i++) {
    const element = relativeTimeElements[i];
    const datetime = element.getAttribute('datetime');

    const date = new Date(datetime);
    const localTime = date.toLocaleString();
    const relativeTime = element.shadowRoot.textContent;

    element.shadowRoot.innerHTML = `${localTime} (${relativeTime})`;
  }
}

const observer = new MutationObserver(mutations => {
  console.log('DOM changed');
  mutations.forEach(mutation => {
    console.log(mutation.addedNodes);
    if (mutation.type === 'childList') {

      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          convertRelativeTimeToAbsoluteTime(node);
        }
      });
    }
  });
});

convertRelativeTimeToAbsoluteTime(targetNode);
observer.observe(targetNode, config);
