/* Add your Supabase project values here. Use the anon key, never the service role key. */
const SUPABASE_URL = "https://btkkwjboqkurblbthovl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FF9xydHsOIpImE3IXnWCyQ_cLXIn3JN";
const DINNER_DRESS_IMAGE = "Dinner%20Dress/Dinner%20Dress%20Image%202026-09-24%20at%2011.26.17%20AM.jpeg";

const productCatalog = {
	"evening-dress": {
		name: "Evening Dress",
		price: "$45,000",
		description: "A sculpted evening silhouette with luxury draping and an elegant couture finish.",
		image: "gown-01.jpg/Image%202026-09-23%20at%206.52.13%20PM.jpeg",
		category: "women"
	},
	"silk-dress": {
		name: "Silk Dress",
		price: "$25,000",
		description: "A fluid silk piece designed for graceful movement and understated elegance.",
		image: "silk-dress.jpg",
		category: "women"
	},
	"diamond-dress": {
		name: "Diamond Dress",
		price: "$150,000",
		description: "Statement glamour with luminous detailing and a striking couture profile.",
		image: "diamond-dress.jpeg",
		category: "women"
	},
	"dinner-dress": {
		name: "Dinner Dress",
		price: "$20,000",
		description: "A refined dinner dress for elevated evenings and refined social moments.",
		image: DINNER_DRESS_IMAGE,
		category: "men"
	},
	"wedding-guest": {
		name: "Wedding Guest",
		price: "$30,000",
		description: "Sophisticated tailoring and soft movement for celebratory occasions.",
		image: "Wedding%20Guest/Image%202026-09-24%20at%2011.49.15%20AM.jpeg",
		category: "men"
	},
	"office-wears": {
		name: "Office Wears",
		price: "$20,000",
		description: "Modern luxury essentials designed for polished daily confidence.",
		image: "Office%20Wears/Image%202026-09-24%20at%2012.13.30%20PM.jpeg",
		category: "men"
	},
	"wedding-groom-wears": {
		name: "Wedding Groom Wears",
		price: "$35,000",
		description: "Custom-tailored elegance that balances detail, movement, and authority.",
		image: "wedding%20Groom/Image%202026-09-24%20at%2012.12.30%20PM.jpeg",
		category: "men"
	},
	"audemars-piguet-royal-oak": {
		name: "Audemars Piguet Royal Oak Pink Gold",
		price: "$52,100",
		description: "A high-complication timepiece with iconic design and enduring prestige.",
		image: "wedding%20Groom/Image%202026-09-24%20at%201.05.36%20PM.jpeg",
		category: "accessories"
	},
	"rolex-daytona": {
		name: "Rolex Cosmograph Daytona Platinum",
		price: "$84,600 USD",
		description: "An iconic luxury chronograph with heritage styling and exceptional finish.",
		image: "Diamond%20Dress/Image%202026-09-24%20at%201.07.12%20PM.jpeg",
		category: "accessories"
	},
	"audemars-piguet-bracelet": {
		name: "Audemars Piguet Royal Oak Pink Gold Bracelet",
		price: "$78,600 USD",
		description: "An unmistakable luxury bracelet in pink gold with collector appeal.",
		image: "wedding%20Groom/Image%202026-09-24%20at%2011.26.17%20AM.jpeg",
		category: "accessories"
	},
	"patek-nautilus": {
		name: "Patek Philippe Nautilus 5610/1P Platinum",
		price: "$112,529 USD",
		description: "A distinguished platinum watch with a timeless wrist presence and polished craftsmanship.",
		image: "WATCHES/Image%202026-09-24%20at%201.12.35%20PM.jpeg",
		category: "accessories"
	},
	"tom-ford-oxford": {
		name: "Tom Ford Wholecut Leather Oxford",
		price: "$1,990",
		description: "A refined leather oxford finished for elegant everyday styling.",
		image: "WATCHES/Image%202026-09-24%20at%202.14.39%20PM.jpeg",
		category: "accessories"
	},
	"tom-ford-claydon": {
		name: "TOM FORD Claydon Lace-Up",
		price: "$1,890",
		description: "A sleek, modern lace-up created for sharp tailoring and full-form elegance.",
		image: "WATCHES/Image%202026-09-24%20at%202.20.24%20PM.jpeg",
		category: "accessories"
	},
	"tom-ford-aston": {
		name: "TOM FORD Aston Suede Sneaker",
		price: "$990",
		description: "Modern texture and soft suede for elevated casual refinement.",
		image: "Office%20Wears/Image%202026-09-24%20at%202.16.54%20PM.jpeg",
		category: "accessories"
	},
	"louboutin-louis-junior": {
		name: "Christian Louboutin Louis Junior Strass",
		price: "$2,495",
		description: "A dazzling statement shoe with unmistakable luxury detailing.",
		image: "Office%20Wears/Image%202026-09-24%20at%202.18.29%20PM.jpeg",
		category: "accessories"
	}
};

window.productCatalog = productCatalog;

const authElements = {
	loginForm: document.querySelector("#login-form"),
	signupForm: document.querySelector("#signup-form"),
	profileForm: document.querySelector("#profile-form"),
	authCard: document.querySelector("#auth-card"),
	profileCard: document.querySelector("#profile-card"),
	loginTab: document.querySelector("#login-tab"),
	signupTab: document.querySelector("#signup-tab"),
	feedback: document.querySelector("#form-feedback"),
	message: document.querySelector("#account-message"),
	userLabel: document.querySelector("#auth-user-label"),
	openButton: document.querySelector("#auth-open-button"),
	logoutButton: document.querySelector("#logout-button"),
	profileEmail: document.querySelector("#profile-email"),
	profileName: document.querySelector("#profile-name")
};

const CART_STORAGE_KEY = "jennifer-signature-cart";
let supabaseClient;

function formatPrice(value) {
	if (typeof value === "number") return `$${value.toLocaleString()}`;
	if (typeof value === "string" && value.trim().startsWith("$")) return value.trim();
	const numericValue = Number(String(value).replace(/[^0-9.-]/g, ""));
	if (Number.isFinite(numericValue)) return `$${numericValue.toLocaleString()}`;
	return "$0";
}

function normalizeSupabaseProduct(record) {
	const productId = record.slug || record.product_id || record.id || record.name?.toLowerCase().replace(/\s+/g, "-");
	const productName = record.name || record.title || "Product";
	const category = String(record.category || record.type || "women").toLowerCase();
	const sourceImage = record.image || record.image_url || record.imageUrl || record.img || "silk-dress.jpg";

	return {
		id: productId,
		name: productName,
		price: formatPrice(record.price ?? 0),
		description: record.description || "Luxury fashion designed for confident, elegant living.",
		image: sourceImage,
		category
	};
}

function syncCatalogFromSupabase(records) {
	if (!Array.isArray(records)) return;

	records.forEach((record) => {
		const normalized = normalizeSupabaseProduct(record);
		if (!normalized.id) return;
		if (normalized.id === "dinner-dress") normalized.image = DINNER_DRESS_IMAGE;
		productCatalog[normalized.id] = {
			name: normalized.name,
			price: normalized.price,
			description: normalized.description,
			image: normalized.image,
			category: normalized.category
		};
	});

	renderCatalogGrid();
}

async function initializeProductCatalogSync() {
	if (!window.supabase || !SUPABASE_URL || SUPABASE_URL.startsWith("YOUR_")) {
		renderCatalogGrid();
		return;
	}

	try {
		supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
		const { data, error } = await supabaseClient.from("products").select("*").limit(50);
		if (error) {
			console.warn("Supabase products table not ready yet:", error.message);
			renderCatalogGrid();
			return;
		}
		if (!Array.isArray(data) || !data.length) {
			renderCatalogGrid();
			return;
		}
		syncCatalogFromSupabase(data);
	} catch (error) {
		console.warn("Could not sync product catalog from Supabase:", error.message);
		renderCatalogGrid();
	}
}

function setFeedback(message, isError = false) {
	if (!authElements.feedback) return;
	authElements.feedback.textContent = message;
	authElements.feedback.classList.toggle("error", isError);
}

function getCart() {
	try {
		return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
	} catch (_error) {
		return [];
	}
}

function saveCart(cart) {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function parsePrice(value) {
	if (!value) return 0;
	const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
	return Number.isFinite(parsed) ? parsed : 0;
}

function openCart() {
	const cartDrawer = document.querySelector("#cart-drawer");
	if (!cartDrawer) return;
	cartDrawer.classList.add("open");
	cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
	const cartDrawer = document.querySelector("#cart-drawer");
	if (!cartDrawer) return;
	cartDrawer.classList.remove("open");
	cartDrawer.setAttribute("aria-hidden", "true");
}

function updateCartBadge() {
	const cartButton = document.querySelector("#cart-button");
	const cartCount = document.querySelector("#cart-count");
	if (!cartButton || !cartCount) return;
	const cart = getCart();
	const totalItems = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
	cartCount.textContent = totalItems;
	cartButton.setAttribute("aria-label", `Shopping cart with ${totalItems} items`);
}

function addToCart(productId) {
	const cart = getCart();
	const existingItem = cart.find((item) => item.id === productId);
	if (existingItem) {
		existingItem.qty += 1;
	} else {
		cart.push({ id: productId, qty: 1 });
	}
	saveCart(cart);
	updateCartBadge();
	renderCart();
}

function changeQuantity(productId, delta) {
	const cart = getCart();
	const currentItem = cart.find((item) => item.id === productId);
	if (!currentItem) return;
	currentItem.qty += delta;
	if (currentItem.qty <= 0) {
		const filteredCart = cart.filter((item) => item.id !== productId);
		saveCart(filteredCart);
	} else {
		saveCart(cart);
	}
	updateCartBadge();
	renderCart();
}

function removeFromCart(productId) {
	const updatedCart = getCart().filter((item) => item.id !== productId);
	saveCart(updatedCart);
	updateCartBadge();
	renderCart();
}

function renderCart() {
	const cartItemsRoot = document.querySelector("#cart-items");
	const checkoutMessage = document.querySelector("#checkout-message");
	if (!cartItemsRoot) return;

	const cart = getCart();
	if (!cart.length) {
		cartItemsRoot.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
		return;
	}

	const itemsHtml = cart.map((item) => {
		const product = productCatalog[item.id] || productCatalog["evening-dress"];
		const unitPrice = parsePrice(product.price);
		const total = unitPrice * Number(item.qty || 0);
		return `
			<div class="cart-item">
				<img src="${product.image}" alt="${product.name}">
				<div class="cart-item-details">
					<h4>${product.name}</h4>
					<p>${product.price}</p>
					<div class="cart-item-actions">
						<button type="button" data-action="decrease" data-product-id="${item.id}">-</button>
						<span>${item.qty}</span>
						<button type="button" data-action="increase" data-product-id="${item.id}">+</button>
					</div>
				</div>
				<div class="cart-item-total">$${total.toLocaleString()}</div>
				<button type="button" class="cart-remove" data-action="remove" data-product-id="${item.id}">Remove</button>
			</div>
		`;
	}).join("");

	const subtotal = cart.reduce((sum, item) => {
		const product = productCatalog[item.id] || productCatalog["evening-dress"];
		return sum + parsePrice(product.price) * Number(item.qty || 0);
	}, 0);

	cartItemsRoot.innerHTML = `
		${itemsHtml}
		<div class="cart-summary">
			<span>Subtotal</span>
			<strong>$${subtotal.toLocaleString()}</strong>
		</div>
	`;
}

function initializeCartUI() {
	if (document.querySelector("#cart-button")) return;

	const header = document.querySelector("header");
	if (!header) return;

	header.insertAdjacentHTML("beforeend", `
		<button type="button" class="cart-button" id="cart-button" aria-label="Shopping cart with 0 items">
			CART <span id="cart-count">0</span>
		</button>
	`);

	document.body.insertAdjacentHTML("beforeend", `
		<div class="cart-drawer" id="cart-drawer" aria-hidden="true">
			<div class="cart-backdrop" data-close-cart="true"></div>
			<div class="cart-panel">
				<div class="cart-header">
					<h3>Your Cart</h3>
					<button type="button" class="cart-close" aria-label="Close cart" data-close-cart="true">×</button>
				</div>
				<div id="cart-items" class="cart-items"></div>
				<div class="checkout-box">
					<h4>Checkout</h4>
					<form id="checkout-form" class="checkout-form">
						<label for="checkout-name">Full name</label>
						<input id="checkout-name" name="name" type="text" required>
						<label for="checkout-email">Email</label>
						<input id="checkout-email" name="email" type="email" required>
						<label for="checkout-phone">Phone</label>
						<input id="checkout-phone" name="phone" type="tel" required>
						<button type="submit">PLACE ORDER</button>
					</form>
					<p id="checkout-message" class="checkout-message" aria-live="polite"></p>
				</div>
			</div>
		</div>
	`);

	const cartDrawer = document.querySelector("#cart-drawer");
	const cartButton = document.querySelector("#cart-button");
	if (cartButton) {
		cartButton.addEventListener("click", () => {
			if (cartDrawer.classList.contains("open")) {
				closeCart();
			} else {
				openCart();
			}
		});
	}
	if (cartDrawer) {
		cartDrawer.addEventListener("click", (event) => {
			if (event.target.dataset.closeCart !== undefined) closeCart();
		});
	}

	document.addEventListener("click", (event) => {
		const actionButton = event.target.closest("[data-action]");
		if (!actionButton) return;
		const productId = actionButton.dataset.productId;
		const action = actionButton.dataset.action;
		if (action === "increase") changeQuantity(productId, 1);
		if (action === "decrease") changeQuantity(productId, -1);
		if (action === "remove") removeFromCart(productId);
	});

	const checkoutForm = document.querySelector("#checkout-form");
	if (checkoutForm) {
		checkoutForm.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const name = formData.get("name");
			const message = document.querySelector("#checkout-message");
			if (!getCart().length) {
				if (message) message.textContent = "Your cart is empty. Add an item before checking out.";
				if (message) message.classList.add("error");
				return;
			}
			if (message) {
				message.textContent = `Thank you, ${name}. Your order has been placed successfully.`;
				message.classList.remove("error");
			}
			localStorage.removeItem(CART_STORAGE_KEY);
			renderCart();
			updateCartBadge();
			event.target.reset();
		});
	}

	updateCartBadge();
	renderCart();
}

function bindProductDetailCartButton() {
	const addToCartButton = document.querySelector(".add-to-cart-button");
	if (!addToCartButton) return;
	const productId = addToCartButton.dataset.productId;
	addToCartButton.addEventListener("click", () => {
		addToCart(productId);
		openCart();
	});
}

function renderProductPage() {
	const detailRoot = document.querySelector("#product-detail");
	if (!detailRoot) return;

	const params = new URLSearchParams(window.location.search);
	const productId = params.get("id") || "evening-dress";
	const product = productCatalog[productId] || productCatalog["evening-dress"];

	detailRoot.innerHTML = `
		<div class="product-detail-layout">
			<div class="product-detail-image-wrap">
				<img class="product-detail-image" src="${product.image}" alt="${product.name}">
			</div>
			<div class="product-detail-info">
				<p class="eyebrow">SIGNATURE PIECE</p>
				<h1>${product.name}</h1>
				<p class="product-detail-price">${product.price}</p>
				<p class="product-detail-description">${product.description}</p>
				<div class="product-detail-actions">
					<a class="shop-button" href="index.html#women">BACK TO COLLECTION</a>
					<button type="button" class="secondary-button add-to-cart-button" data-product-id="${productId}">ADD TO CART</button>
				</div>
			</div>
		</div>
	`;
	bindProductDetailCartButton();
}

function showAuthTab(tab) {
	const showingSignup = tab === "signup";
	authElements.loginForm.classList.toggle("hidden", showingSignup);
	authElements.signupForm.classList.toggle("hidden", !showingSignup);
	authElements.loginTab.classList.toggle("active", !showingSignup);
	authElements.signupTab.classList.toggle("active", showingSignup);
	authElements.loginTab.setAttribute("aria-selected", String(!showingSignup));
	authElements.signupTab.setAttribute("aria-selected", String(showingSignup));
	setFeedback("");
}

function showAccount(user) {
	const signedIn = Boolean(user);
	authElements.authCard.classList.toggle("hidden", signedIn);
	authElements.profileCard.classList.toggle("hidden", !signedIn);
	authElements.userLabel.textContent = signedIn ? (user.user_metadata?.full_name || user.email) : "Guest";
	authElements.openButton.textContent = signedIn ? "ACCOUNT" : "SIGN IN";
	authElements.message.textContent = signedIn ? "Your profile and account access are ready." : "Sign in to manage your couture profile.";

	if (signedIn) {
		authElements.profileEmail.textContent = user.email;
		authElements.profileName.value = user.user_metadata?.full_name || "";
	} else {
		authElements.profileName.value = "";
	}
}

async function loadSession() {
	const { data: { session } } = await supabaseClient.auth.getSession();
	showAccount(session?.user || null);
}

async function handleLogin(event) {
	event.preventDefault();
	const formData = new FormData(event.currentTarget);
	setFeedback("Signing you in...");
	const { error } = await supabaseClient.auth.signInWithPassword({
		email: formData.get("email"),
		password: formData.get("password")
	});
	setFeedback(error ? error.message : "You are signed in.", Boolean(error));
}

async function handleSignup(event) {
	event.preventDefault();
	const formData = new FormData(event.currentTarget);
	setFeedback("Creating your account...");
	const { data, error } = await supabaseClient.auth.signUp({
		email: formData.get("email"),
		password: formData.get("password"),
		options: { data: { full_name: formData.get("name") } }
	});

	if (error) {
		setFeedback(error.message, true);
		return;
	}

	if (!data.session) {
		showAuthTab("login");
		setFeedback("Account created. Check your email to verify your address before signing in.");
		return;
	}

	setFeedback("Account created and signed in.");
	showAccount(data.user);
}

async function handleProfileUpdate(event) {
	event.preventDefault();
	const formData = new FormData(event.currentTarget);
	setFeedback("Saving your profile...");
	const { error } = await supabaseClient.auth.updateUser({
		data: { full_name: formData.get("name") }
	});
	setFeedback(error ? error.message : "Profile saved.", Boolean(error));
	if (!error) await loadSession();
}

async function handleLogout() {
	const { error } = await supabaseClient.auth.signOut();
	setFeedback(error ? error.message : "You have been signed out.", Boolean(error));
	if (!error) showAccount(null);
}

function renderCatalogGrid() {
	const sections = {
		women: document.querySelector("#women-products"),
		men: document.querySelector("#men-products"),
		accessories: document.querySelector("#accessories-products")
	};

	Object.values(sections).forEach((container) => {
		if (container) container.innerHTML = "";
	});

	Object.entries(productCatalog).forEach(([productId, product]) => {
		const category = product.category || "women";
		const container = sections[category];
		if (!container) return;

		const card = document.createElement("article");
		card.className = "product-card";
		card.dataset.productId = productId;
		card.dataset.category = category;
		card.innerHTML = `
			<div class="product-image">
				<img src="${product.image}" alt="${product.name}">
			</div>
			<div class="product-info">
				<h3>${product.name}</h3>
				<p class="price">${product.price}</p>
				<button type="button">SHOP NOW</button>
			</div>
		`;
		container.appendChild(card);
	});

	initializeProductButtons();
	initializeProductFilters();
}

function initializeProductButtons() {
	document.querySelectorAll(".product-card").forEach((card) => {
		const button = card.querySelector("button");
		if (!button) return;
		const productId = card.dataset.productId || "evening-dress";
		button.type = "button";
		button.onclick = () => {
			window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
		};
	});
}

function initializeProductFilters() {
	const filterButtons = document.querySelectorAll(".filter-button");
	if (!filterButtons.length) return;

	filterButtons.forEach((button) => {
		button.onclick = () => {
			const selectedFilter = button.dataset.filter || "all";
			filterButtons.forEach((item) => item.classList.toggle("active", item === button));
			document.querySelectorAll(".product-card").forEach((card) => {
				const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
				card.style.display = matches ? "" : "none";
			});
		};
	});
}

function initializeAuth() {
	if (!authElements.loginForm && !authElements.signupForm && !authElements.profileForm && !authElements.logoutButton) {
		renderProductPage();
		return;
	}

	if (SUPABASE_URL.startsWith("YOUR_") || SUPABASE_ANON_KEY.startsWith("YOUR_")) {
		setFeedback("Add your Supabase URL and anon key in script.js to enable accounts.", true);
		return;
	}

	if (!supabaseClient) {
		supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	}

	authElements.loginForm.addEventListener("submit", handleLogin);
	authElements.signupForm.addEventListener("submit", handleSignup);
	authElements.profileForm.addEventListener("submit", handleProfileUpdate);
	authElements.logoutButton.addEventListener("click", handleLogout);
	authElements.loginTab.addEventListener("click", () => showAuthTab("login"));
	authElements.signupTab.addEventListener("click", () => showAuthTab("signup"));
	authElements.openButton.addEventListener("click", () => document.querySelector("#account").scrollIntoView({ behavior: "smooth" }));
	supabaseClient.auth.onAuthStateChange((_event, session) => showAccount(session?.user || null));
	loadSession();
	showAuthTab("login");
}

initializeCartUI();
initializeProductButtons();
initializeProductFilters();
renderCatalogGrid();
initializeProductCatalogSync();
initializeAuth();
renderProductPage();
