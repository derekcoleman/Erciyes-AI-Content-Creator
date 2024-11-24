const API_BASE_URL = "http://192.168.197.116:8080/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  SETTNGS: `${API_BASE_URL}/settings/topic`,
  JOBS: `${API_BASE_URL}/settings`,
  FETCH_USER_INFO: `${API_BASE_URL}/user/info`,
  AI: `${API_BASE_URL}/ai`
};

export const daysOfWeek = [
  { label: "Pazartesi", value: 1 },
  { label: "Salı", value: 2 },
  { label: "Çarşamba", value: 3 },
  { label: "Perşembe", value: 4 },
  { label: "Cuma", value: 5 },
  { label: "Cumartesi", value: 6 },
  { label: "Pazar", value: 7 },
];

export const posts = [
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 1 Başlığı",
    content:
      "Pellentesque sodales ex vitae lacus laoreet tempor. Aenean vitae mauris et risus ultrices varius at sit amet sapien. Nam cursus, metus vitae rutrum pharetra, justo velit lacinia nunc, non elementum erat nunc id erat. Nunc quis tempor mi. Vestibulum ligula velit, pharetra id sollicitudin vitae, dapibus ut eros. Maecenas suscipit accumsan mauris, eu eleifend mi maximus vel. Pellentesque mollis tellus ut libero suscipit, vel varius sem consequat.",
    hashtags: ["tag1", "tag2"],
    likes: 15,
    comments: 5,
    date: "2024-10-28T14:30:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 2 Başlığı",
    content:
      "Donec quis lorem sit amet arcu finibus tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus faucibus ex et faucibus fringilla. Praesent risus dolor, iaculis in metus quis, bibendum dignissim justo. Fusce bibendum leo ante, et iaculis lacus condimentum quis. Fusce sodales purus a massa consequat lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 3 Başlığı",
    content:
      "Nunc facilisis cursus massa, non viverra orci fringilla sed. Vivamus commodo eu turpis ac sodales. Suspendisse at ex ut nulla eleifend hendrerit. In lacinia neque vitae mollis mattis. Nulla facilisi. Maecenas id porttitor lorem. Suspendisse non nibh vehicula, porttitor quam nec, finibus lectus. Vestibulum placerat pharetra lacinia. Donec at magna et urna lacinia congue. In nec finibus elit. Phasellus nec est ligula. Nunc ut.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 4 Başlığı",
    content:
      "Curabitur ut pellentesque ligula. Nam interdum libero vitae arcu sagittis, id rhoncus nunc suscipit. Nunc commodo maximus turpis, eu fermentum orci ornare quis. Aliquam hendrerit felis ut diam lobortis imperdiet. Nam luctus purus nec velit consectetur, pretium egestas arcu molestie. Praesent facilisis tempor imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent congue, nulla ut facilisis volutpat, felis.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 5 Başlığı",
    content:
      "Donec quis lorem sit amet arcu finibus tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus faucibus ex et faucibus fringilla. Praesent risus dolor, iaculis in metus quis, bibendum dignissim justo. Fusce bibendum leo ante, et iaculis lacus condimentum quis. Fusce sodales purus a massa consequat lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 6 Başlığı",
    content:
      "Nunc facilisis cursus massa, non viverra orci fringilla sed. Vivamus commodo eu turpis ac sodales. Suspendisse at ex ut nulla eleifend hendrerit. In lacinia neque vitae mollis mattis. Nulla facilisi. Maecenas id porttitor lorem. Suspendisse non nibh vehicula, porttitor quam nec, finibus lectus. Vestibulum placerat pharetra lacinia. Donec at magna et urna lacinia congue. In nec finibus elit. Phasellus nec est ligula. Nunc ut.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 7 Başlığı",
    content:
      "Curabitur ut pellentesque ligula. Nam interdum libero vitae arcu sagittis, id rhoncus nunc suscipit. Nunc commodo maximus turpis, eu fermentum orci ornare quis. Aliquam hendrerit felis ut diam lobortis imperdiet. Nam luctus purus nec velit consectetur, pretium egestas arcu molestie. Praesent facilisis tempor imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent congue, nulla ut facilisis volutpat, felis.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 8 Başlığı",
    content:
      "Donec quis lorem sit amet arcu finibus tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus faucibus ex et faucibus fringilla. Praesent risus dolor, iaculis in metus quis, bibendum dignissim justo. Fusce bibendum leo ante, et iaculis lacus condimentum quis. Fusce sodales purus a massa consequat lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 9 Başlığı",
    content:
      "Nunc facilisis cursus massa, non viverra orci fringilla sed. Vivamus commodo eu turpis ac sodales. Suspendisse at ex ut nulla eleifend hendrerit. In lacinia neque vitae mollis mattis. Nulla facilisi. Maecenas id porttitor lorem. Suspendisse non nibh vehicula, porttitor quam nec, finibus lectus. Vestibulum placerat pharetra lacinia. Donec at magna et urna lacinia congue. In nec finibus elit. Phasellus nec est ligula. Nunc ut.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
  {
    platform: "instagram",
    postImage: "/Gradient.png",
    title: "Post 10 Başlığı",
    content:
      "Curabitur ut pellentesque ligula. Nam interdum libero vitae arcu sagittis, id rhoncus nunc suscipit. Nunc commodo maximus turpis, eu fermentum orci ornare quis. Aliquam hendrerit felis ut diam lobortis imperdiet. Nam luctus purus nec velit consectetur, pretium egestas arcu molestie. Praesent facilisis tempor imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent congue, nulla ut facilisis volutpat, felis.",
    hashtags: ["tag3", "tag4"],
    likes: 20,
    comments: 8,
    date: "2024-10-28T15:00:00Z",
  },
];

export const platforms = ["Instagram", "LinkedIn", "Facebook", "Twitter"];
