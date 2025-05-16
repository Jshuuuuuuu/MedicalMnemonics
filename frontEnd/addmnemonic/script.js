document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mnemonic-form');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const category = document.getElementById('category').value;
        const system = document.getElementById('system').value;
        const difficulty = document.getElementById('difficulty').value;
        const exam = document.getElementById('exam').value;
        const tags = document.getElementById('tags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
        
     
        if (!title || !content || !category) {
            alert('Please fill in all required fields');
            return;
        }
        
     
        const newMnemonic = {
            title,
            content,
            category,
            system,
            difficulty,
            exam,
            tags
        };
        
      
        console.log('New mnemonic to be saved:', newMnemonic);
        
     
        alert('Mnemonic submitted successfully!');
        
        
        form.reset();
        
       
    });
    
   
    cancelBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            
            form.reset();
        }
    });
    
 
    const contentField = document.getElementById('content');
    const charCount = document.createElement('div');
    charCount.className = 'char-count';
    charCount.style.fontSize = '0.8rem';
    charCount.style.color = '#777';
    charCount.style.textAlign = 'right';
    charCount.style.marginTop = '0.5rem';
    contentField.parentNode.insertBefore(charCount, contentField.nextSibling);
    
    contentField.addEventListener('input', () => {
        const count = contentField.value.length;
        charCount.textContent = `${count} characters`;
    });
});