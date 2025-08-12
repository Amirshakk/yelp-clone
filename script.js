function searchBusinesses() {
  const searchInput = document.getElementById('searchInput').value;
  const businessList = document.getElementById('businessList');

  // پاک کردن لیست قبلی
  businessList.innerHTML = '';

  // داده‌های نمونه
  const businesses = [
    {
      name: 'رستوران نمونه',
      category: 'رستوران',
      location: 'تهران',
      rating: '★★★★☆',
      reviews: 12,
      image: 'https://via.placeholder.com/300x150'
    },
    {
      name: 'کافه نمونه',
      category: 'کافه',
      location: 'تهران',
      rating: '★★★☆☆',
      reviews: 8,
      image: 'https://via.placeholder.com/300x150'
    }
  ];

  // اگر ورودی خالی بود
  if (searchInput.trim() === '') {
    businessList.innerHTML = '<p>لطفاً عبارت جستجو را وارد کنید.</p>';
    return;
  }

  // فیلتر کردن بر اساس ورودی (ساده)
  const filteredBusinesses = businesses.filter(business =>
    business.name.includes(searchInput) || business.category.includes(searchInput)
  );

  // نمایش نتایج
  filteredBusinesses.forEach(business => {
    const businessDiv = document.createElement('div');
    businessDiv.className = 'business-item';
    businessDiv.innerHTML = `
      <img src="${business.image}" alt="${business.name}">
      <h3>${business.name}</h3>
      <p>${business.category} - ${business.location}</p>
      <div class="rating">${business.rating} (${business.reviews} نظر)</div>
      <a href="business-details.html" class="details-button">مشاهده جزئیات</a>
    `;
    businessList.appendChild(businessDiv);
  });

  if (filteredBusinesses.length === 0) {
    businessList.innerHTML = '<p>نتیجه‌ای یافت نشد.</p>';
  }
}

// نمایش اولیه کسب‌وکارها
window.onload = searchBusinesses;