import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseService from './FirebaseService.js';


const firebaseService = new FirebaseService();
const mnemonics = [
    {
        title: "CRASH for Beta-Blocker Toxicity",
        content: "C - Confusion, R - Refractory seizures, A - Arrhythmias, S - Sedation/hypotension, H - Hypoglycemia",
        category: "pharmacology",
        tags: ["pharmacology", "toxicology", "emergency"]
    },
    {
        title: "FAST for Stroke Symptoms",
        content: "F - Face drooping, A - Arm weakness, S - Speech difficulty, T - Time to call emergency",
        category: "pathology",
        tags: ["neurology", "emergency", "clinical"]
    },
    {
        title: "Cranial Nerves Mnemonic",
        content: "On Old Olympus' Towering Tops, A Finn And German Viewed Some Hops",
        category: "anatomy",
        tags: ["anatomy", "neuroanatomy", "high-yield"]
    },
    {
        title: "SALAD for Parkinson's Medications",
        content: "S - Selegiline, A - Amantadine, L - Levodopa, A - Apomorphine, D - Dopamine agonists",
        category: "pharmacology",
        tags: ["pharmacology", "neurology", "treatment"]
    },
    {
        title: "ABCDE of Melanoma",
        content: "A - Asymmetry, B - Border irregularity, C - Color variation, D - Diameter >6mm, E - Evolving",
        category: "pathology",
        tags: ["dermatology", "oncology", "clinical"]
    },
    {
        title: "5 T's of Cyanotic Heart Disease",
        content: "Tetralogy of Fallot, Transposition of great arteries, Truncus arteriosus, Tricuspid atresia, Total anomalous pulmonary venous return",
        category: "pathology",
        tags: ["cardiology", "pediatrics", "congenital"]
    },
    {
        title: "Rule of 2's for Meckel Diverticulum",
        content: "2 inches long, 2 feet from ileocecal valve, 2% prevalence, 2 years old, 2 types of tissue",
        category: "embryology",
        tags: ["gastrointestinal", "congenital"]
    },
    {
        title: "Some Say Marry Money But My Brother Says Big Brains Matter More",
        content: "Mnemonic for cranial nerves sensory/motor/both: Some (Sensory) Say (Sensory) Marry (Motor) Money (Motor) But (Both) My (Motor) Brother (Both) Says (Sensory) Big (Both) Brains (Both) Matter (Motor) More (Motor)",
        category: "anatomy",
        tags: ["neuroanatomy", "high-yield"]
    }
];


function renderMnemonics(filteredMnemonics = mnemonics) {
    const grid = document.getElementById('mnemonics-grid');
    grid.innerHTML = '';
    
    filteredMnemonics.forEach(mnemonic => {
        const card = document.createElement('div');
        card.className = 'mnemonic-card';
        
        
        const tagClass = mnemonic.category.toLowerCase();
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${mnemonic.title}</h3>
            </div>
            <div class="card-body">
                <p>${mnemonic.content}</p>
                <div class="card-tags">
                    <span class="tag ${tagClass}">${mnemonic.category}</span>
                    ${mnemonic.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="view-btn">View Details</a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}


document.querySelectorAll('.category-list a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        
        document.querySelectorAll('.category-list li').forEach(li => {
            li.classList.remove('active');
        });
        e.target.parentElement.classList.add('active');
        
        const category = e.target.textContent.toLowerCase();
        
        if (category === 'all') {
            renderMnemonics();
            return;
        }
        
        const filtered = mnemonics.filter(mnemonic => 
            mnemonic.category.toLowerCase() === category
        );
        
        renderMnemonics(filtered);
    });
});


document.querySelector('.search-container button').addEventListener('click', () => {
    const searchTerm = document.querySelector('.search-container input').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        renderMnemonics();
        return;
    }
    
    const filtered = mnemonics.filter(mnemonic => {
        return mnemonic.title.toLowerCase().includes(searchTerm) ||
               mnemonic.content.toLowerCase().includes(searchTerm) ||
               mnemonic.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
    
    renderMnemonics(filtered);
});

// Allow search on Enter key
document.querySelector('.search-container input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.search-container button').click();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMnemonics();
});