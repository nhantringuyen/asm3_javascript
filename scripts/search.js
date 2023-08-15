"use strict";
/*--------------------check login------------------------*/
isLogin();
/*--------------------current user object-----------------*/
const user = userArr.find((u) => u.username === storedUser.username);
/*--------------------variable for element ---------------*/
const previousButton = document.getElementById("btn-prev");
const nextButton = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const pageNumElement = document.getElementById("page-num");
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const navPageNum = document.getElementById("nav-page-num");
let currentPage = 1;

/*---------------show previous page------------------*/
previousButton.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    const keyword = inputQuery.value;
    await searchGnew(keyword);
  }
});
/*---------------show next page------------------*/
nextButton.addEventListener("click", async () => {
  currentPage++;
  const keyword = inputQuery.value;
  await searchGnew(keyword);
});

/**
 *
 * @param keyword string
 * @return {Promise<void>}
 */
async function searchGnew(keyword) {
  try {
    // Kiểm tra từ khóa
    if (!keyword) {
      throw new Error("Please enter search keyword.");
    }

    // call api Gnew with keyword
    const news = await user.getResults(currentPage, keyword);
    newsContainer.innerHTML = "";
    const totalResults = news.totalResults;
    const totalPages = Math.ceil(totalResults / user.newsPerPage);
    if(news.length === 0) {}
    else {
      // Display news articles
      news.articles.forEach((article) => {
        const cardWrap = document.createElement("div");
        cardWrap.classList.add("card", "flex-row", "flex-wrap");

        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "w-100");

        const row = document.createElement("div");
        row.classList.add("row", "no-gutters");

        if (article.urlToImage !== null) {
          const colImg = document.createElement("div");
          colImg.classList.add("col-md-4");
          const img = document.createElement("img");
          img.src = article.urlToImage;
          img.classList.add("card-img");
          img.alt = article.title;
          colImg.appendChild(img);
          row.appendChild(colImg);
        }

        const colBody = document.createElement("div");
        if (article.urlToImage !== null) {
          colBody.classList.add("col-md-8");
        } else {
          colBody.classList.add("col-md-12");
        }

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = article.title;

        const link = document.createElement("a");
        link.href = article.url;
        link.classList.add("btn", "btn-primary");
        link.textContent = "View";

        cardBody.appendChild(title);
        if (article.description !== null) {
          const content = document.createElement("p");
          content.classList.add("card-text");
          content.textContent = article.description;
          cardBody.appendChild(content);
        }
        cardBody.appendChild(link);
        colBody.appendChild(cardBody);
        row.appendChild(colBody);

        card.appendChild(row);
        cardWrap.appendChild(card);
        newsContainer.appendChild(cardWrap);
      });

      // Update the current page number display
      pageNumElement.textContent = currentPage;
      // Check whether to display the "Previous" button
      previousButton.style.display = currentPage === 1 ? "none" : "inline";
      // Check whether to display the "Next" button
      nextButton.style.display = currentPage === totalPages ? "none" : "inline";
      console.log((totalPages > 1));
      navPageNum.classList.remove("d-none", "d-blockv");
      navPageNum.classList.add((totalPages > 1) ? "d-block" : "d-none");
    }
  } catch (e) {
    if (!(e instanceof Error)) {
      e = new Error(e);
    }
    alert("Error: " + e.message);
  }
}

/* --submit form search-- */
btnSubmit.addEventListener("click", async () => {
  const keyword = inputQuery.value;
  await searchGnew(keyword);
});
