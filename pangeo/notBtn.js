function sharkUp() {
    var numb = Math.floor(Math.random()*3);
    var rn;
    switch(numb){
        case 0 :
            dub = window.open("https://img.freepik.com/free-vector/cute-shark-with-doughnut_138676-3244.jpg"
            ,"Ratting","width=400,height=400,left=150,top=200,toolbar=0,status=0,");
            break;
        case 1 :
            rn = document.getElementById("notBtn name");
            rn.style.display = "none";
            break;
        case 2 :
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.font = "67.5px Comic Sans MS";
            ctx.fillText("System Overload", 10, 200);
    }
}