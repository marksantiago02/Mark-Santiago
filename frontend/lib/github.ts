import { GithubRepo } from "./types"

const GitHubAccessToken = process.env.GITHUB_ACCESS_TOKEN

const tempData = {
  "login": "BTC415",
  "id": 133281370,
  "node_id": "U_kgDOB_G2Wg",
  "avatar_url": "https://avatars.githubusercontent.com/u/133281370?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/BTC415",
  "html_url": "https://github.com/BTC415",
  "followers_url": "https://api.github.com/users/BTC415/followers",
  "following_url": "https://api.github.com/users/BTC415/following{/other_user}",
  "gists_url": "https://api.github.com/users/BTC415/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/BTC415/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/BTC415/subscriptions",
  "organizations_url": "https://api.github.com/users/BTC415/orgs",
  "repos_url": "https://api.github.com/users/BTC415/repos",
  "events_url": "https://api.github.com/users/BTC415/events{/privacy}",
  "received_events_url": "https://api.github.com/users/BTC415/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "MARK",
  "company": "Freelance",
  "blog": "",
  "location": "Angeles, Philippines",
  "email": null,
  "hireable": null,
  "bio": "A critical and forward thinking fullstack developer && blockchain engineer",
  "twitter_username": null,
  "public_repos": 95,
  "public_gists": 0,
  "followers": 658,
  "following": 7,
  "created_at": "2023-05-11T21:47:48Z",
  "updated_at": "2024-11-21T08:32:27Z"
}


// its for /api/stats/github
export async function fetchGithub() {
  const fake = false
  if (fake) return tempData

  return fetch(
    "https://api.github.com/users/BTC415",
    {
      headers: {
        Authorization: `Bearer ${GitHubAccessToken}`,
      },
    }
  ).then((res) => res.json())
}

// its for getting temporary old data
export function getOldStats() {
  return tempData
}

/* Retrieves the number of stars and forks for the user's repositories on GitHub. */
export async function getGithubStarsAndForks() {
  // Fetch user's repositories from the GitHub API
  const res = await fetch(
    "https://api.github.com/users/BTC415/repos?per_page=100",
    // {
    //   headers: {
    //     Authorization: `Bearer ${GitHubAccessToken}`,
    //   },
    // }
  )
  const userRepos = await res.json()

  /* Default Static Data: If use exceeded the rate limit of api */
  if (
    (userRepos.documentation_url ===
      "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting")
  ) {
    return {
      githubStars: 7,
      forks: 4,
    }
  }
  // filter those repos that are forked
  // const mineRepos: GithubRepo[] = userRepos?.filter(
  //   (repo: GithubRepo) => !repo.fork
  // )

  // Calculate the total number of stars for the user's repositories
  const githubStars = userRepos.reduce(
    (accumulator: number, repository: GithubRepo) => {
      return accumulator + repository["stargazers_count"]
    },
    0
  )

  // Calculate the total number of forks for the user's repositories
  const forks = userRepos.reduce(
    (accumulator: number, repository: GithubRepo) => {
      return accumulator + repository["forks_count"]
    },
    0
  )

  return { githubStars, forks }
}
