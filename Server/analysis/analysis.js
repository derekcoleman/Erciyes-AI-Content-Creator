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
    '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'];

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
    '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
];


const analysis = (posts, language) => {

    const stopWords = language === 'tr' ? STOP_WORDS_TR : STOP_WORDS_EN;

    const combinedPosts = posts.map((post) => `${post.title}`);


    const cleanText = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/);
    };


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


    posts.forEach((post) => {
        post.engagement = post.likeCounts + post.commentCounts;
    });
    const mostPopularPost = posts.reduce((max, post) =>
        post.engagement > max.engagement ? post : max
    );

    const mostUsedWord = Object.keys(wordCounts)
        .sort((a, b) => wordCounts[b] - wordCounts[a])
        .slice(0, 5);


    console.log("Kelime Sıklığı:", wordCounts);
    console.log("En sık kullanılan kelime:", mostUsedWord);
    console.log("En Popüler Post:", mostPopularPost);
};
module.exports ={analysis};