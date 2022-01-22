
let count_score = 0;
//// Play button
let play_start = document.querySelector('.play_start_button');
///quiz body
let quizbody = document.querySelector('.quizbody');
//// welcome section welcome_section
let welcome_section = document.querySelector('.welcome_section');

//// timer
let timer = document.querySelector('.timer');

let end_quiz = document.querySelector('.end_quiz');

// /// quiz_body
let quiz_body = document.querySelector('.quiz_items')
quizbody.style.display = 'none'



let correct_ans = [];
for(i=0;i<allqs.length;i++){
    correct_ans.push([allqs[i].qs_id,allqs[i].qs_right_ans])
}
let user_ans = [];



//// function after clcik play button
let time = allqs.length*3000;
play_start.addEventListener('click',function(){
    welcome_section.innerHTML = `<h2 class='wait-text' >wait for the quiz....</h2>`
    setTimeout(function(){
        welcome_section.style.display = 'none';
        quizbody.style.display = 'block'
    },3000) 
    
     allqs.forEach( (qs,index) => {

       let html = `<div class="quiz-item">
                  <h3 class="quiz-item_qs h-2" data-quiz-id='${qs.qs_id}' >
                  Q${index+1}:
                  ${qs.qs_q}
                   </h3>
                  <div class="quiz-item_options">`

                  qs.qs_ans_collection.forEach(function(ans){
                    html+=`<p class="textsm m10 quiz-item_option" data-quiz-id='${qs.qs_id}' data-quiz-ans='${ans}'>${ans}</p>`;
                  })
                  
                      
                      
               html+=  ` </div>
              </div>`;

        quiz_body.insertAdjacentHTML("beforeend",html);     

         
         
     }); 
     
     timer.innerHTML = 'time start';
    setInterval(function(){

            if(time == 0){
                end_quiz.click();
                return;
            }
            time = time - 1000;
            
            timer.innerHTML ='time left:'+time/1000;


    },1000)
});


quiz_body.addEventListener('click',function(e){
    if(e.target.classList.contains('quiz-item_option')){

        let allop = e.target.parentNode.querySelectorAll('.quiz-item_option');
        for(i=0;i<allop.length;i++){
            allop[i].classList.remove('selectedans')
        }
        //console.log(allop)

        
        e.target.classList.add('selectedans') 
    }
})








////////////////////



end_quiz.addEventListener('click',function(){

    let all_ans = document.querySelectorAll('.selectedans');

    for(i=0;i<all_ans.length;i++){
       let s_quiz_id = all_ans[i].getAttribute('data-quiz-id');
       let s_quiz_ans = all_ans[i].getAttribute('data-quiz-ans');
       user_ans.push([s_quiz_id,s_quiz_ans]);


    }

    function prepans(){
        user_ans.forEach(function(userans){

           
            correct_ans.forEach(function(ca){

                if(ca[0]==userans[0] && ca[1]==userans[1]){       
                    count_score+=1;
                }

            })

            return;
           
    
        })
  
    }
    
    prepans();

    welcome_section.style.display = 'block' ;
        
    quizbody.style.display = 'none'

    let current_url = window.location.href;
    

    welcome_section.innerHTML = `<div class="welcome_section__contents"><br><br><br><br><br><br><br><br><br>
    
     <h2 class="h-2">COUNT HERO</h2>
    <button class="btn btnscore m10">Your Score: ${count_score}</button>
    <a href="${current_url}"><button class="play_start_button btn">GO to HOME</button></a>
    
    <p class="textsm m10">made by dihab</p>
</div>` ;
})










