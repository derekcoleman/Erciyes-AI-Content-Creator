const STOP_WORDS_EN = [
    'about', 'above', 'after', 'again', 'all', 'also', 'am', 'an', 'and', 'another',
    'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
    'between', 'both', 'but', 'by', 'came', 'can', 'cannot', 'come', 'could', 'did',
    'do', 'does', 'doing', 'during', 'each', 'few', 'for', 'from', 'further', 'get',
    'got', 'has', 'had', 'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how',
    'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'like', 'make', 'many', 'me',
    'might', 'more', 'most', 'much', 'must', 'my', 'myself', 'never', 'now', 'of', 'on',
    'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
    'said', 'same', 'see', 'she', 'should', 'since', 'so', 'some', 'still', 'such', 'take', 'than',
    'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
    'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
    'way', 'we', 'well', 'were', 'what', 'where', 'when', 'which', 'while', 'who',
    'whom', 'with', 'would', 'why', 'you', 'your', 'yours', 'yourself',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '0', '_', ''];

const STOP_WORDS_TR = [
    "ve", "bir", "bu", "şu", "o", "ama", "ile", "için", "de", "da", "ki",
    "ya", "eğer", "çünkü", "böyle", "gibi", "ise", "veya", "hem", "hatta",
    "sonra", "önce", "şimdi", "daha", "kadar", "sadece", "zaten", "ancak",
    "her", "hiç", "yine", "çok", "pek", "az", "hep", "tüm", "bazen", "bazı",
    "tümü", "ayrıca", "herhalde", "işte", "tabi", "tabii", "sanki", "bile",
    "yine", "şu an", "şunlar", "onlar", "biz", "siz", "ben", "sen", "kim",
    "ne", "nerede", "nasıl", "neden", "niçin", "hangi", "kimin", "kaç",
    "iyi", "kötü", "güzel", "var", "yok", "oldu", "olmak", "olabilir", "değil",
    "böylece", "hatta", "çünkü", "dolayı", "yani", "ancak", "böyle", "aynı",
    "tüm", "herhangi", "birçok", "pek çok", "en", "gibi", "ya da", "ya da",
    "ile ilgili", "üzere", "yalnızca", 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '0', '_', ''
];


const analysis = (posts, language) => {

    console.log("Girdi");
    console.log("Posts:", posts);
    let stopWords = [];
    let cleanText = "";

    if (language === 'tr') {
        stopWords = STOP_WORDS_TR;
        cleanText = (text) => {
            return text
                .toLocaleLowerCase('tr-TR')
                .replace(/[^a-zA-Z\u00C0-\u01FF\s]/g, '')
                .split(/\s+/);
        };
    } else {
        stopWords = STOP_WORDS_EN;
        cleanText = (text) => {
            return text
                .toLowerCase()
                .replace(/[^a-zA-Z\u00C0-\u01FF\s]/g, '')
                .split(/\s+/);
        };
    }


    const combinedPosts = posts.map((post) => `${post.title}`);


    const wordCounts = {};
    // combinedPosts.forEach((text) => {
    //     const words = cleanText(text);
    //     //natural stopword in french

    //     words.forEach((word) => {
    //         if (!natural.stopwords.includes(word)) {
    //             wordCounts[word] = (wordCounts[word] || 0) + 1;
    //         }
    //     });
    // });
    combinedPosts.forEach((text) => {
        const words = cleanText(text);
        //natural stopword in french

        words.forEach((word) => {
            if (!stopWords.includes(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });
    });

    // Post bazlı analizler
    posts.forEach((post) => {
        post.engagementLike = post.viewCounts > 0
            ? post.likeCounts / post.viewCounts
            : 0;
        post.engagementComment = post.viewCounts > 0
            ? post.commentCounts / post.viewCounts
            : 0;
        post.totalEngagement = post.likeCounts + post.commentCounts;
    });

    // En çok beğeni alan post
    const mostLikedPost = posts.reduce((max, post) =>
        post.likeCounts > max.likeCounts ? post : max
    );

    // En çok yorum alan post
    const mostCommentedPost = posts.reduce((max, post) =>
        post.commentCounts > max.commentCounts ? post : max
    );

    // En çok görüntülenen post
    const mostViewedPost = posts.reduce((max, post) =>
        post.viewCounts > max.viewCounts ? post : max
    );

    // Görüntülenmeye kıyasla en çok beğeni alan post
    const highestLikeEngagementPost = posts.reduce((max, post) =>
        post.engagementLike > max.engagementLike ? post : max
    );

    // Görüntülenmeye kıyasla en çok yorum alan post
    const highestCommentEngagementPost = posts.reduce((max, post) =>
        post.engagementComment > max.engagementComment ? post : max
    );

    // En çok etkileşim alan post
    const mostEngagedPost = posts.reduce((max, post) =>
        post.totalEngagement > max.totalEngagement ? post : max
    );

    //# of likes and comments / # of followers x 100

    //Sort wordCounts
    const sortedWordCounts = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});


    console.log("Kelime Sıklığı:", sortedWordCounts);
    console.log("En çok kullanılan kelimeler:", Object.keys(sortedWordCounts).slice(0, 5));
    console.log("En çok beğeni alan post:", mostLikedPost);
    console.log("En çok yorum alan post:", mostCommentedPost);
    console.log("En çok görüntülenen post:", mostViewedPost);
    console.log("Görüntülenmeye göre en çok beğeni alan post:", highestLikeEngagementPost);
    console.log("Görüntülenmeye göre en çok yorum alan post:", highestCommentEngagementPost);
    console.log("En çok etkileşim alan post:", mostEngagedPost);

};
module.exports = { analysis };