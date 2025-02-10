(function() {
    // Regular expression to match email addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  
    // Recursively replace emails in text nodes
    function replaceEmails(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(emailRegex, "####@####.###");
      } else {
        node.childNodes.forEach(child => replaceEmails(child));
      }
    }
  
    // Initial replacement once DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
      replaceEmails(document.body);
    });
  
    // Observe DOM changes to handle dynamically added content
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(added => replaceEmails(added));
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  