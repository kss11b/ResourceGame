import { RSAA } from 'redux-api-middleware';

export const GET_TECH_ARTICLES = "GET_TECH_ARTICLES";
export const GET_TECH_ARTICLES_SUCCESS = "GET_TECH_ARTICLES_SUCCESS";
export const GET_TECH_ARTICLES_FAILURE = "GET_TECH_ARTICLES_FAILURE";

export const GET_SPORTS_ARTICLES = "GET_SPORTS_ARTICLES";
export const GET_SPORTS_ARTICLES_SUCCESS = "GET_SPORTS_ARTICLES_SUCCESS";
export const GET_SPORTS_ARTICLES_FAILURE = "GET_SPORTS_ARTICLES_FAILURE";

export const GET_BUSINESS_ARTICLES = "GET_BUSINESS_ARTICLES";
export const GET_BUSINESS_ARTICLES_SUCCESS = "GET_BUSINESS_ARTICLES_SUCCESS";
export const GET_BUSINESS_ARTICLES_FAILURE = "GET_BUSINESS_ARTICLES_FAILURE";

export const GET_SCIENCE_ARTICLES = "GET_SCIENCE_ARTICLES";
export const GET_SCIENCE_ARTICLES_SUCCESS = "GET_SCIENCE_ARTICLES_SUCCESS";
export const GET_SCIENCE_ARTICLES_FAILURE = "GET_SCIENCE_ARTICLES_FAILURE";

export const GET_POLITICAL_ARTICLES = "GET_POLITICAL_ARTICLES";
export const GET_POLITICAL_ARTICLES_SUCCESS = "GET_POLITICAL_ARTICLES_SUCCESS";
export const GET_POLITICAL_ARTICLES_FAILURE = "GET_POLITICAL_ARTICLES_FAILURE";

export const GET_ENTERTAINMENT_ARTICLES = "GET_POLITICAL_ARTICLES";
export const GET_ENTERTAINMENT_ARTICLES_SUCCESS = "GET_POLITICAL_ARTICLES_SUCCESS";
export const GET_ENTERTAINMENT_ARTICLES_FAILURE = "GET_POLITICAL_ARTICLES_FAILURE";

export const getTechArticles = () => (
  {
    [RSAA] :
    {
      headers: { 'Content-Type': 'application/json' },
      types: [GET_TECH_ARTICLES, GET_TECH_ARTICLES_SUCCESS, GET_TECH_ARTICLES_FAILURE],
      method: 'GET',
      endpoint: '/api/getTechArticles',
  }
});

export const getSportsArticles = () => (
  {
    [RSAA] :
    {
      headers: { 'Content-Type': 'application/json' },
      types: [GET_SPORTS_ARTICLES, GET_SPORTS_ARTICLES_SUCCESS, GET_SPORTS_ARTICLES_FAILURE],
      method: 'GET',
      endpoint: '/api/getSportsArticles',
  }
});

export const getBusinessArticles = () =>  (
  {
    [RSAA] :
    {
      headers: { 'Content-Type': 'application/json' },
      types: [GET_BUSINESS_ARTICLES, GET_BUSINESS_ARTICLES_SUCCESS, GET_BUSINESS_ARTICLES_FAILURE],
      method: 'GET',
      endpoint: '/api/getBusinessArticles',
  }
});

export const getScienceArticles = () =>  (
  {
    [RSAA] :
    {
      headers: { 'Content-Type': 'application/json' },
      types: [GET_SCIENCE_ARTICLES, GET_SCIENCE_ARTICLES_SUCCESS, GET_SCIENCE_ARTICLES_FAILURE],
      method: 'GET',
      endpoint: '/api/getScienceArticles',
  }
});

export const getPoliticalArticles = () => (
  {
    [RSAA] :
    {
      headers: { 'Content-Type': 'application/json' },
      types: [GET_POLITICAL_ARTICLES, GET_POLITICAL_ARTICLES_SUCCESS, GET_POLITICAL_ARTICLES_FAILURE],
      method: 'GET',
      endpoint: '/api/getPoliticalArticles',
  }
});

export const getEntertainmentArticles = () =>  (
  {
    [RSAA] :
    {
      headers: { 'Content-Type': 'application/json' },
      types: [GET_ENTERTAINMENT_ARTICLES, GET_ENTERTAINMENT_ARTICLES_SUCCESS, GET_ENTERTAINMENT_ARTICLES_FAILURE],
      method: 'GET',
      endpoint: '/api/getEntertainmentArticles',
  }
});
