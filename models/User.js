"use strict";

/**
 * Class User
 */
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    newsPerPage = 5,
    newsCategory = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.newsPerPage = newsPerPage;
    this.newsCategory = newsCategory;
    this.country = "us";
    this.api = "a416f499e24a43c590bd1d402deb3ac6";
  }

  /**
   * @param page int
   * @return {Promise<any|*[]>}
   */
  async getNews(page) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.newsCategory}&pageSize=${this.newsPerPage}&page=${page}&apiKey=${this.api}`
      );
      const data = await response.json();
      if (data.status === "ok") {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
      return [];
    }
  }

  /**
   *
   * @param page int
   * @param keyword string
   * @return {Promise<any|*[]>}
   */
  async getResults(page, keyword) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${this.newsPerPage}&page=${page}&apiKey=${this.api}`
      );
      const data = await response.json();
      if (data.status === "ok") {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
      return [];
    }
  }

  /**
   *
   * @param newsPerPage int
   * @param newsCategory string
   */
  updateSettings(newsPerPage, newsCategory) {
    // Update the settings with user-provided values
    this.newsPerPage = parseInt(newsPerPage);
    this.newsCategory = newsCategory;
  }
}
