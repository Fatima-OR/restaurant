
        // Global state management using functional approach
        let restaurantState = {
            dishes: [],
            currentView: 'home',
            activeFilter: 'all',
            modal: {
                isOpen: false,
                currentDish: null
            }
        };

        // Data management functions
        function loadDishes() {
            const saved = localStorage.getItem('restaurant_dishes');
            return saved ? JSON.parse(saved) : [];
        }

        function saveDishes() {
            localStorage.setItem('restaurant_dishes', JSON.stringify(restaurantState.dishes));
        }

        function initializeDefaultData() {
            if (restaurantState.dishes.length === 0) {
                restaurantState.dishes = [
                    {
                        id: 1,
                        name: "Salade de Fruits Tropicaux",
                        description: "Mélange frais de mangue, ananas, kiwi et fruits de la passion",
                        price: 18.00,
                        category: "entrees",
                        image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: true
                    },
                    {
                        id: 2,
                        name: "Poisson Grillé aux Légumes d'Été",
                        description: "Dorade grillée accompagnée de courgettes, tomates cerises et basilic frais",
                        price: 32.00,
                        category: "plats",
                        image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: true
                    },
                    {
                        id: 3,
                        name: "Sorbet Citron-Menthe Maison",
                        description: "Sorbet artisanal au citron vert et menthe fraîche du jardin",
                        price: 12.00,
                        category: "desserts",
                        image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: true
                    },
                    {
                        id: 4,
                        name: "Gazpacho de Tomates",
                        description: "Soupe froide de tomates fraîches, concombre et poivrons",
                        price: 14.00,
                        category: "entrees",
                        image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: false
                    },
                    {
                        id: 5,
                        name: "Brochettes de Crevettes Marinées",
                        description: "Crevettes marinées aux herbes, grillées et servies avec riz parfumé",
                        price: 28.00,
                        category: "plats",
                        image: "https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: false
                    },
                    {
                        id: 6,
                        name: "Tarte aux Fruits Rouges",
                        description: "Tarte sablée garnie de fraises, framboises et myrtilles fraîches",
                        price: 16.00,
                        category: "desserts",
                        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: false
                    },
                    {
                        id: 7,
                        name: "Carpaccio de Melon et Jambon",
                        description: "Fines tranches de melon cantaloupe et jambon de Parme, roquette",
                        price: 20.00,
                        category: "entrees",
                        image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: false
                    },
                    {
                        id: 8,
                        name: "Salade de Quinoa aux Légumes Grillés",
                        description: "Quinoa, légumes de saison grillés, avocat et vinaigrette citronnée",
                        price: 24.00,
                        category: "plats",
                        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
                        featured: false
                    }
                ];
                saveDishes();
            }
        }

        // Data access functions
        function getAllDishes() {
            return restaurantState.dishes;
        }

        function getDishesByCategory(category) {
            if (category === 'all') return restaurantState.dishes;
            return restaurantState.dishes.filter(dish => dish.category === category);
        }

        function getFeaturedDishes() {
            return restaurantState.dishes.filter(dish => dish.featured);
        }

        function getDishById(id) {
            return restaurantState.dishes.find(dish => dish.id === id);
        }

        function addDish(dishData) {
            const newId = Math.max(...restaurantState.dishes.map(d => d.id), 0) + 1;
            const newDish = {
                id: newId,
                ...dishData,
                featured: false
            };
            restaurantState.dishes.push(newDish);
            saveDishes();
            return newDish;
        }

        function updateDish(id, dishData) {
            const index = restaurantState.dishes.findIndex(dish => dish.id === id);
            if (index !== -1) {
                restaurantState.dishes[index] = { ...restaurantState.dishes[index], ...dishData };
                saveDishes();
                return restaurantState.dishes[index];
            }
            return null;
        }

        function deleteDish(id) {
            const index = restaurantState.dishes.findIndex(dish => dish.id === id);
            if (index !== -1) {
                const deleted = restaurantState.dishes.splice(index, 1)[0];
                saveDishes();
                return deleted;
            }
            return null;
        }

        function toggleFeatured(id) {
            const dish = getDishById(id);
            if (dish) {
                dish.featured = !dish.featured;
                saveDishes();
                return dish;
            }
            return null;
        }

        // Utility functions
        function formatPrice(price) {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            }).format(price);
        }

        function formatCategory(category) {
            const categories = {
                'entrees': 'Entrées',
                'plats': 'Plats',
                'desserts': 'Desserts'
            };
            return categories[category] || category;
        }

        function showToast(message, duration = 3000) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
        }

        function animateIn(element, delay = 0) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            }, delay);
        }

        function validateDishForm(formData) {
            const errors = [];

            if (!formData.name || formData.name.trim().length < 2) {
                errors.push('Le nom du plat doit contenir au moins 2 caractères');
            }

            if (!formData.description || formData.description.trim().length < 10) {
                errors.push('La description doit contenir au moins 10 caractères');
            }

            if (!formData.price || formData.price <= 0) {
                errors.push('Le prix doit être supérieur à 0');
            }

            if (!formData.category) {
                errors.push('Veuillez sélectionner une catégorie');
            }

            if (!formData.image || !isValidUrl(formData.image)) {
                errors.push('Veuillez fournir une URL d\'image valide');
            }

            return errors;
        }

        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }

        function handleImageError(img) {
            img.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
            img.alt = 'Image non disponible';
        }

        function lazyLoadImage(img) {
            return new Promise((resolve, reject) => {
                const imageLoader = new Image();
                imageLoader.onload = () => {
                    img.src = imageLoader.src;
                    img.classList.add('loaded');
                    resolve(img);
                };
                imageLoader.onerror = reject;
                imageLoader.src = img.dataset.src || img.src;
            });
        }

        // UI rendering functions
        function createDishCard(dish, isAdmin = false) {
            const card = document.createElement('div');
            card.className = isAdmin ? 'admin-card' : 'dish-card';
            card.setAttribute('data-category', dish.category);
            
            if (isAdmin) {
                card.innerHTML = createAdminCardHTML(dish);
                setupAdminCardEvents(card, dish);
            } else {
                card.innerHTML = createRegularCardHTML(dish);
            }
            
            const img = card.querySelector('.dish-image');
            if (img) {
                img.onerror = () => handleImageError(img);
                lazyLoadImage(img);
            }
            
            card.addEventListener('mouseenter', () => {
                card.style.animationDelay = Math.floor(Math.random() * 200) + 'ms';
            });
            
            return card;
        }

        function createRegularCardHTML(dish) {
            return `
                <img src="${dish.image}" alt="${dish.name}" class="dish-image" loading="lazy">
                <div class="dish-content">
                    <h3 class="dish-name">${dish.name}</h3>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-footer">
                        <span class="dish-price" data-price="${formatPrice(dish.price)}">${formatPrice(dish.price)}</span>
                        <span class="dish-category">${formatCategory(dish.category)}</span>
                    </div>
                </div>
            `;
        }

        function createAdminCardHTML(dish) {
            return `
                <img src="${dish.image}" alt="${dish.name}" class="dish-image" loading="lazy">
                <div class="dish-content">
                    <h3 class="dish-name">${dish.name}</h3>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-footer">
                        <span class="dish-price">${formatPrice(dish.price)}</span>
                        <span class="dish-category">${formatCategory(dish.category)}</span>
                    </div>
                    <div class="admin-actions">
                        <button class="edit-btn" data-id="${dish.id}">Modifier</button>
                        <button class="delete-btn" data-id="${dish.id}">Supprimer</button>
                        <button class="feature-btn ${dish.featured ? 'featured' : ''}" data-id="${dish.id}">
                            ${dish.featured ? 'Retirer' : 'Mettre en avant'}
                        </button>
                    </div>
                </div>
            `;
        }

        function setupAdminCardEvents(card, dish) {
            const editBtn = card.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    editDish(dish.id);
                });
            }

            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Êtes-vous sûr de vouloir supprimer "${dish.name}" ?`)) {
                        handleDeleteDish(dish.id);
                    }
                });
            }

            const featureBtn = card.querySelector('.feature-btn');
            if (featureBtn) {
                featureBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleToggleFeatured(dish.id);
                });
            }
        }

        function renderDishes(container, dishes, isAdmin = false) {
            container.innerHTML = '';

            if (dishes.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <p>Aucun plat trouvé</p>
                    </div>
                `;
                return;
            }

            dishes.forEach((dish, index) => {
                const card = createDishCard(dish, isAdmin);
                container.appendChild(card);
                animateIn(card, index * 100);
            });
        }

        // View management functions
        function showView(viewName) {
            const views = document.querySelectorAll('.view');
            views.forEach(view => view.classList.remove('active'));

            const targetView = document.getElementById(`${viewName}-view`);
            if (targetView) {
                targetView.classList.add('active');
                restaurantState.currentView = viewName;
                loadViewContent(viewName);
            }
        }

        function setActiveNavButton(button) {
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        }

        function loadViewContent(viewName) {
            switch (viewName) {
                case 'home':
                    loadHomeView();
                    break;
                case 'menu':
                    loadMenuView();
                    break;
                case 'admin':
                    loadAdminView();
                    break;
            }
        }

        function loadHomeView() {
            const featuredContainer = document.getElementById('featuredDishes');
            if (!featuredContainer) return;

            const featuredDishes = getFeaturedDishes();
            renderDishes(featuredContainer, featuredDishes, false);
        }

        function loadMenuView() {
            const menuContainer = document.getElementById('menuGrid');
            if (!menuContainer) return;

            const dishes = getDishesByCategory(restaurantState.activeFilter);
            renderDishes(menuContainer, dishes, false);
        }

        function loadAdminView() {
            const adminContainer = document.getElementById('adminGrid');
            if (!adminContainer) return;

            const allDishes = getAllDishes();
            renderDishes(adminContainer, allDishes, true);
        }

        function refreshCurrentView() {
            loadViewContent(restaurantState.currentView);
        }

        // Filter management
        function filterDishes(category) {
            if (restaurantState.currentView !== 'menu') return;

            restaurantState.activeFilter = category;
            
            const dishes = getDishesByCategory(category);
            const menuContainer = document.getElementById('menuGrid');
            
            const existingCards = menuContainer.querySelectorAll('.dish-card');
            existingCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(-20px)';
                    card.style.opacity = '0';
                }, index * 50);
            });

            setTimeout(() => {
                renderDishes(menuContainer, dishes, false);
            }, existingCards.length * 50 + 200);
        }

        function setActiveFilter(category) {
            restaurantState.activeFilter = category;
            
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
        }

        // Modal management functions
        function openModal(dish = null) {
            restaurantState.modal.currentDish = dish;
            restaurantState.modal.isOpen = true;
            
            const modal = document.getElementById('dishModal');
            const title = document.getElementById('modalTitle');
            const form = document.getElementById('dishForm');
            
            if (title) {
                title.textContent = dish ? 'Modifier le Plat' : 'Ajouter un Plat';
            }

            if (dish) {
                populateForm(dish);
            } else {
                form.reset();
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            const firstInput = form.querySelector('input, textarea, select');
            if (firstInput) firstInput.focus();
        }

        function closeModal() {
            restaurantState.modal.isOpen = false;
            restaurantState.modal.currentDish = null;
            
            const modal = document.getElementById('dishModal');
            const form = document.getElementById('dishForm');
            
            modal.classList.remove('active');
            document.body.style.overflow = '';
            form.reset();
        }

        function populateForm(dish) {
            const fields = {
                dishId: dish.id,
                dishName: dish.name,
                dishDescription: dish.description,
                dishPrice: dish.price,
                dishCategory: dish.category,
                dishImage: dish.image
            };

            Object.keys(fields).forEach(field => {
                const element = document.getElementById(field);
                if (element && fields[field] !== undefined) {
                    element.value = fields[field];
                }
            });
        }

        function getFormData() {
            return {
                name: document.getElementById('dishName')?.value.trim() || '',
                description: document.getElementById('dishDescription')?.value.trim() || '',
                price: parseFloat(document.getElementById('dishPrice')?.value) || 0,
                category: document.getElementById('dishCategory')?.value || '',
                image: document.getElementById('dishImage')?.value.trim() || ''
            };
        }

        function handleFormSubmit() {
            const formData = getFormData();
            const errors = validateDishForm(formData);

            if (errors.length > 0) {
                showToast(errors[0], 4000);
                return;
            }

            if (restaurantState.modal.currentDish) {
                const updated = updateDish(restaurantState.modal.currentDish.id, formData);
                if (updated) {
                    showToast('Plat modifié avec succès');
                    refreshCurrentView();
                }
            } else {
                const newDish = addDish(formData);
                if (newDish) {
                    showToast('Plat ajouté avec succès');
                    refreshCurrentView();
                }
            }

            closeModal();
        }

        // Event handlers
        function editDish(dishId) {
            const dish = getDishById(dishId);
            if (dish) {
                openModal(dish);
            }
        }

        function handleDeleteDish(dishId) {
            const deleted = deleteDish(dishId);
            if (deleted) {
                showToast(`"${deleted.name}" supprimé`);
                refreshCurrentView();
            }
        }

        function handleToggleFeatured(dishId) {
            const dish = toggleFeatured(dishId);
            if (dish) {
                const status = dish.featured ? 'mis en avant' : 'retiré de la mise en avant';
                showToast(`"${dish.name}" ${status}`);
                refreshCurrentView();
            }
        }

        // Scroll and resize handlers
        function handleScroll() {
            const cards = document.querySelectorAll('.dish-card, .admin-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top >= 0 && rect.left >= 0 && 
                    rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
                
                if (isVisible && !card.classList.contains('animated')) {
                    card.classList.add('animated');
                    animateIn(card);
                }
            });

            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }

        function handleResize() {
            const isMobile = window.innerWidth <= 768;
            document.body.classList.toggle('mobile', isMobile);
        }

        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        // Initialize application
        function initializeApp() {
            // Load data
            restaurantState.dishes = loadDishes();
            initializeDefaultData();

            // Setup navigation
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const view = e.target.dataset.view;
                    showView(view);
                    setActiveNavButton(e.target);
                });
            });

            // Setup modal
            const closeBtn = document.getElementById('closeModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const modal = document.getElementById('dishModal');
            const form = document.getElementById('dishForm');

            closeBtn?.addEventListener('click', closeModal);
            cancelBtn?.addEventListener('click', closeModal);
            
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            form?.addEventListener('submit', (e) => {
                e.preventDefault();
                handleFormSubmit();
            });

            // Setup filter buttons
            const filterContainer = document.querySelector('.category-filters');
            if (filterContainer) {
                filterContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('filter-btn')) {
                        const category = e.target.dataset.category;
                        setActiveFilter(category);
                        filterDishes(category);
                    }
                });
            }

            // Setup other buttons
            const addDishBtn = document.getElementById('addDishBtn');
            addDishBtn?.addEventListener('click', () => openModal());

            const exploreBtn = document.getElementById('exploreMenu');
            exploreBtn?.addEventListener('click', () => {
                showView('menu');
                setActiveNavButton(document.querySelector('[data-view="menu"]'));
            });

            // Setup global event listeners
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && restaurantState.modal.isOpen) {
                    closeModal();
                }
            });

            window.addEventListener('resize', throttle(handleResize, 250));
            window.addEventListener('scroll', throttle(handleScroll, 100));

            // Show initial view
            showView('home');

            // Add initial logo animation
            const logo = document.querySelector('.logo-icon');
            if (logo) {
                setTimeout(() => {
                    logo.style.transform = 'rotate(360deg) scale(1.1)';
                    setTimeout(() => {
                        logo.style.transform = 'rotate(0deg) scale(1)';
                    }, 600);
                }, 1000);
            }
        }

        // Start the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeApp);
