(() => {

    const actions = {
        birdFlies(key){
            //key값에 따라서 분기
            if(key){
                document.querySelector('[data-index="2"] .bird').style.transform = 
                `translateX(${window.innerWidth}px)`;
            }else{
                document.querySelector('[data-index="2"] .bird').style.transform = 
                `translateX(-100%)`; // 초기화 (스크롤을 벗어나면)
            }
        },
        birdFlies2(key){
            //key값에 따라서 분기
            if(key){
                document.querySelector('[data-index="5"] .bird').style.transform = 
                `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            }else{
                document.querySelector('[data-index="5"] .bird').style.transform = 
                `translateX(-100%)`; // 초기화 (스크롤을 벗어나면)
            }
        }
    }

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // 현재 활성화된 (visible 클래스가 붙은) .graphic-item을 지정
    let ioIndex;
    
    // 아이템 양이 많을 경우 눈에 안 보이는 아이템들까지 배열을 돌게 되면 비효율적, 이를 막기 위해 IntersectionObserver()를 사용!
    // InterSectionObserver() 사용시 어떤 엘리먼트가 화면에 노출되었는지 알려줌
    // 일종의 관찰자 역할
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1 ; // 문자열로 찍힘 --> 숫자로 변경
        // Tip : 문자열 --- 숫자로 바꿀때 *1 해주면 됨!

    });

    for(let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i]); // 관찰 대상으로 등록됨
        // 1. setAttribute로 i 값 추가
        // stepElems[i].setAttribute('data-index', i);
        
        // 2. data- 형식은 아래와 같이 넣어줄 수 있음!
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 함수는 기능별로 따로 분리해서 쓰는 것이 좋다.
    // 활성화
    function activate(action){
        currentItem.classList.add('visible')
        if(action){
            // [메서드 이름]
            actions[action](true); 
        }
    }

    // 비 활성화
    function inactivate(action){
        currentItem.classList.remove('visible')
        if(action){
            // [메서드 이름]
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        let temp = 0; // 변수가 돌 때마다 +1 시켜줄 예정
        // for (let i = 0; i < stepElems.length; i++){
        for (let i = ioIndex -1; i < ioIndex + 2; i++){
            step = stepElems[i];
            if(!step) continue; // step에 값이 없다면 pass
            // getBoundingClientRect().top은 페이지 가장 위부터 그 엘리먼트의 top까지의 크기
            boundingRect = step.getBoundingClientRect();
            temp ++;
            // console.log(boundingRect)
            if(boundingRect.top > window.innerHeight * 0.1 &&
            boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index);
                // visible 클래스를 붙일 아이템
                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
        console.log(temp); // 원래는 아이템의 갯수 10으로 찍히지만 이전, 현재 값만 총 3이 찍히도록 하기
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0)); // 맨 위로 올리기
    });

    // 처음에 호출을 해줘야 페이지 로드시 화면이 나타남!
    activate();
})();