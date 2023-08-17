var number = true;
var music = document.getElementById("music");
var bt1 = document.getElementById("bt1");
var music2 = document.getElementById("huasheng");

bt1.onclick = function () {
  if (number == false) {
    number = true;
    music.pause();
  } else {
    number = false;
    music.play();
  }
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
var width = 850;
var height = 350;
var aBullets = [];

var container = document.getElementsByClassName("bg")[0];
var elf = document.getElementsByClassName("elf")[0];
var isOver = false;

async function main() {
  deltaTime = 0;
  bid = 0;
  var score = 0;
  music.play();

  while (!isOver) {
    //（1）每3秒钟，加入一个新的花生到数组中
    if (deltaTime > 40 * 0.6) {
      bid++;
      aBullets.push({
        Id: bid,
        x: 750,
        y: Math.random() * (height - 50),
        dx: -2,
        dy: 0,
        domObj: null,
      });
      console.log("已经过了0.6秒了！");
      deltaTime = 0;
    }

    //（2）计算数组中出现过的花生的新位置
    document.getElementById("score").innerHTML = score;

    for (var index = 0; index < aBullets.length; index++) {
      var element = aBullets[index];

      // if (element.x < 0 || element.x > width) {
      //   score++;
      // }

      element.x += element.dx;
      element.y += element.dy;

      if (element.domObj == null) {
        //新建花生的dom对象
        var newEle = document.createElement("div");
        newEle.className = "box";
        container.appendChild(newEle);

        element.domObj = newEle;
      }

      //(3.1)将每个花生的新位置展示出来

      element.domObj.style.left = element.x + "px";
      element.domObj.style.top = element.y + "px";

      //(3.2)将花生的位置与any的位置相比较

      var elfX1 = parseInt(elf.style.left);
      var elfY1 = parseInt(elf.style.top);
      var elfX2 = elfX1 + 40;
      var elfY2 = elfY1 + 43;

      if (
        element.x > elfX1 &&
        element.x < elfX2 &&
        element.y > elfY1 &&
        element.y < elfY2
      ) {
        $("#any").removeClass("elf");
        $("#any").addClass("elf2");
        //music.pause();
        // container.removeChild(newEle);
        element.domObj.remove();
        element.x = -1000 + "px";
        music2.play();
        score++;
      }
      if (parseInt(element.x) < 0 && parseInt(element.x) > -100) {
        isOver = true;
        music.pause();
        break;
      }
    }

    //(4)睡眠一小段时间
    await sleep(25);
    deltaTime++;
  }
  container.removeEventListener("mousemove", mouseTrack, false);
  alert("game over!");
}

function mouseTrack(event) {
  console.log("mouse move ..." + event.offsetX + "," + event.offsetY);
  curX = event.clientX;
  curY = event.clientY;
  elf.style.left = curX + "px";
  elf.style.top = curY + "px";
}

container.addEventListener("mousemove", mouseTrack);

main();
