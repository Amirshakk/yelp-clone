async function loadBusinesses() {
  try {
    const response = await fetch('../assets/data/businesses.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading businesses:', error);
    return [];
  }
}

function renderStars(rating) {
  const fullStar = '<i class="fas fa-star"></i>';
  const emptyStar = '<i class="far fa-star"></i>';
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? fullStar : emptyStar;
  }
  return stars;
}

async function searchBusinesses() {
  const searchInput = document.getElementById('searchInput')?.value || '';
  const businessList = document.getElementById('businessList');
  if (!businessList) return;

  businessList.innerHTML = '';
  const businesses = await loadBusinesses();

  if (searchInput.trim() === '') {
    businessList.innerHTML = '<p>لطفاً عبارت جستجو را وارد کنید.</p>';
    return;
  }

  const filteredBusinesses = businesses.filter(business =>
    business.name.includes(searchInput) || business.category.includes(searchInput)
  );

  filteredBusinesses.forEach(business => {
    const businessDiv = document.createElement('div');
    businessDiv.className = 'business-item';
    businessDiv.innerHTML = `
      <img src="${business.image}" alt="${business.name}">
      <h3>${business.name}</h3>
      <p>${business.category} - ${business.location}</p>
      <div class="rating">${renderStars(business.rating)} (${business.reviews} نظر)</div>
      <a href="pages/business-details.html?id=${business.id}" class="details-button">مشاهده جزئیات</a>
    `;
    businessList.appendChild(businessDiv);
  });

  if (filteredBusinesses.length === 0) {
    businessList.innerHTML = '<p>نتیجه‌ای یافت نشد.</p>';
  }
}

function initMap() {
  // این تابع فقط در business-details.html فراخوانی می‌شود
}

async function loadBusinessDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = urlParams.get('id');
  if (!businessId) return;

  const businesses = await loadBusinesses();
  const business = businesses.find(b => b.id === parseInt(businessId));
  if (!business) return;

  document.getElementById('businessName').textContent = business.name;
  document.getElementById('businessCategory').textContent = `${business.category} - ${business.location}`;
  document.getElementById('businessRating').innerHTML = `${renderStars(business.rating)} (${business.reviews} نظر)`;
  document.getElementById('businessDescription').textContent = `توضیحات: ${business.description}`;
  document.querySelector('.details-image').src = business.image;

  const reviewsList = document.getElementById('reviewsList');
  reviewsList.innerHTML = '';
  business.reviewsList.forEach(review => {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';
    reviewDiv.innerHTML = `
      <p class="review-user">${review.user}:</p>
      <p>${review.text}</p>
      <div class="review-rating">${renderStars(review.rating)}</div>
    `;
    reviewsList.appendChild(reviewDiv);
  });

  // مقداردهی اولیه نقشه
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: business.lat, lng: business.lng },
    zoom: 15
  });

  new google.maps.Marker({
    position: { lat: business.lat, lng: business.lng },
    map: map,
    title: business.name
  });
}

// اجرای توابع بر اساس صفحه
if (window.location.pathname.includes('business-details.html')) {
  window.onload = loadBusinessDetails;
} else {
  window.onload = searchBusinesses;
}