// 명언 데이터 배열
const quotes = [
    {
        text: "성공은 실패의 반복이다.",
        author: "아리스토텔레스"
    },
    {
        text: "가장 어두운 밤이 지나면 가장 밝은 아침이 온다.",
        author: "찰스 디킨스"
    },
    {
        text: "꿈을 이루는 데 필요한 것은 세 가지뿐이다. 능력, 노력, 그리고 기회.",
        author: "알렉산드르 드마"
    },
    {
        text: "위대한 일은 작은 노력으로 이루어진다.",
        author: "공자"
    },
    {
        text: "오늘 할 수 있는 일을 내일로 미루지 말라.",
        author: "벤자민 프랭클린"
    },
    {
        text: "삶이 있는 한 희망은 있다.",
        author: "키케로"
    },
    {
        text: "길을 잃는 것은 두려운 일이 아니다. 길을 잃었다는 사실을 깨닫지 못하는 것이 두려운 일이다.",
        author: "공자"
    },
    {
        text: "최고의 예언은 과거다.",
        author: "조지 버나드 쇼"
    },
    {
        text: "인생은 거울과 같다. 웃으면 웃어주고, 울면 울어준다.",
        author: "윌리엄 메이크피스 새커리"
    },
    {
        text: "가장 큰 영광은 한 번도 넘어지지 않는 것이 아니라, 넘어질 때마다 일어서는 것이다.",
        author: "넬슨 만델라"
    },
    {
        text: "시작이 반이다.",
        author: "플라톤"
    },
    {
        text: "지식은 힘이다.",
        author: "프랜시스 베이컨"
    },
    {
        text: "생각하라, 그리고 존재하라.",
        author: "르네 데카르트"
    },
    {
        text: "행동은 모든 성공의 기초이다.",
        author: "파블로 피카소"
    },
    {
        text: "미래는 현재 우리가 하는 일에 달려 있다.",
        author: "마하트마 간디"
    }
];

// DOM 요소 가져오기
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.querySelector('.theme-icon');
const htmlElement = document.documentElement;

// 현재 표시된 명언 인덱스
let currentQuoteIndex = -1;

// 새로운 명언 표시 함수
function displayNewQuote() {
    let newIndex;
    
    // 이전 명언과 다른 명언이 나올 때까지 반복
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);
    
    currentQuoteIndex = newIndex;
    const quote = quotes[currentQuoteIndex];
    
    // 페이드 아웃 효과
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    // 텍스트 변경
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        // 페이드 인 효과
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

// CSS 트랜지션 추가
quoteText.style.transition = 'opacity 0.3s ease';
quoteAuthor.style.transition = 'opacity 0.3s ease';

// 이벤트 리스너 추가
newQuoteBtn.addEventListener('click', displayNewQuote);

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    displayNewQuote();
});

// 테마 전환 함수
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 아이콘 변경
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // 아이콘 회전 애니메이션
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeIcon.style.transform = 'rotate(0deg)';
    }, 300);
}

// 저장된 테마 불러오기
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    } else {
        // 시스템 테마 감지
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', defaultTheme);
        themeIcon.textContent = defaultTheme === 'dark' ? '☀️' : '🌙';
    }
}

// 키보드 이벤트 (스페이스바로도 명언 변경 가능)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        displayNewQuote();
    }
});

// 테마 전환 버튼 이벤트 리스너
themeToggleBtn.addEventListener('click', toggleTheme);
