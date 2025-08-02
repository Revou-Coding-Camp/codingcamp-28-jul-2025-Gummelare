 document.addEventListener('DOMContentLoaded', function() {
            const nameInputContainer = document.getElementById('nameInputContainer');
            const nameInput = document.getElementById('nameInput');
            const nameSubmitBtn = document.getElementById('nameSubmitBtn');
            const userNameElement = document.getElementById('userName');
            const header = document.getElementById('header');
            const classCards = document.querySelectorAll('.class-card');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            const animateOnScroll = function() {
                classCards.forEach(card => {
                    const cardPosition = card.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (cardPosition < screenPosition) {
                        card.classList.add('animate');
                    }
                });
            };

            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll();

            nameSubmitBtn.addEventListener('click', function() {
                const userName = nameInput.value.trim();
                if (userName) {
                    userNameElement.textContent = userName;
                    nameInputContainer.classList.add('hidden');
                    
                    localStorage.setItem('userName', userName);
                }
            });
            
            const savedName = localStorage.getItem('userName');
            if (savedName) {
                userNameElement.textContent = savedName;
                nameInputContainer.classList.add('hidden');
            }
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nama = document.getElementById('nama').value;
                const tanggal = document.getElementById('tanggal').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const pesan = document.getElementById('pesan').value;
                
                const dateObj = new Date(tanggal);
                const formattedDate = dateObj.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, '-');
                
                const now = new Date();
                const currentTime = now.toLocaleString('id-ID', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                const ticketHTML = `
                    <div class="ticket">
                        <p><strong>Nama:</strong> ${nama}</p>
                        <p><strong>Tanggal Lahir:</strong> ${formattedDate}</p>
                        <p><strong>Jenis Kelamin:</strong> ${gender === 'laki' ? 'Pria' : 'Perempuan'}</p>
                        <p><strong>Pesan:</strong> ${pesan}</p>
                        <p class="ticket-time">${currentTime}</p>
                    </div>
                `;
                
                const ticketsContainer = document.getElementById('tickets-container');
                ticketsContainer.insertAdjacentHTML('afterbegin', ticketHTML);
                
                contactForm.reset();
                
                alert('Pesan berhasil dikirim!');
                
                const contactInfoSection = document.getElementById('contact');
                contactInfoSection.scrollIntoView({ behavior: 'smooth' });
            });
        });