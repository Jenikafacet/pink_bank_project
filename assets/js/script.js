const newsList = document.getElementById("newsList");

fetch('https://newsapi.org/v2/everything?q=stocks&sortBy=publishedAt&apiKey=b0ec2303fe7040c0834c0a32db70e9a3')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        for (let i = 0; i < 10; i++) {
            let newsItem = document.createElement("li");
            newsList.appendChild(newsItem);
            let newsItemLink = document.createElement("a");
            newsItemLink.classList.add("newsLink");
            newsItemLink.textContent = data.articles[i].title;
            newsItemLink.target = "_blank";
            newsItemLink.href = data.articles[i].url;
            newsItem.appendChild(newsItemLink);
            let newsItemInfo = document.createElement("div");
            newsItemInfo.classList.add("newsInfo");
            newsItemInfo.textContent = data.articles[i].publishedAt.split("T")[1].slice(0, -4) + ", " + data.articles[i].source.name;
            newsItem.appendChild(newsItemInfo);
        }
    })
    .catch((err) => {
        console.log(err);
        let newsErr = document.createElement("li");
        newsErr.textContent = "Новости не найдены";
        newsList.appendChild(newsErr);
    });