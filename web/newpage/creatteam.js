

    //定义队伍信息对象
    function team(name,description,id)
    {
        this.name=name;
        this.description=desccription;
        this.id=id;//邀请码
    }
    //按此格式创建对象并以json格式存在服务器中




    /*
    该check函数需要补充检查内容，从后端取数据
    */
    function check()//检查是否合法
    {
        //if()
        return true;
        //else
        return false;
    }




    var bt=document.getElementById(3);
    var chars="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    bt.addEventListener("click",function(){
        //check and creat a team
        if(check()==true)//录入合法:队伍名称合法，队伍简介合法
        {
            //生成邀请码并创建队伍信息给后台
            //var json=;  创建信息并保存
            
            /*
            此处需要补充内容********************
            */
           
           

            //生成邀请码
            var idx;
            var ids="";
            for(var i=1;i<=26;i++)
            {
                idx=Math.round(Math.random()*44);
                ids+=chars[idx];
            }
            showbox("创建队伍成功!");
            
            var change=document.getElementById("id4");
            change.innerHTML="您的邀请码是:";

            change=document.getElementsByTagName("div")[1];
            
            var newbtn='<br></br><button id=6>复&nbsp制</button>'; //追加复制按钮
            change.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;'+ids+newbtn; 
            change.style.left='6%';
            change.style.height='4%';
            change.style.width='30%';

            change=document.getElementById(6);
            
            change.style.left='0px';
            change.style.fontWeight='700';
            change.style.color='rgb(37, 37, 37)';
            //change.style.backgroundColor='rgb(205, 247, 247)';
            //设置按钮
            change.addEventListener("click",function()
            {
                //复制到剪切板
                //alert(3);
                 const input = document.createElement('input');
                 document.body.appendChild(input);
                 input.setAttribute('value', ids);
                 input.select();
                    if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    console.log('复制成功');
                  }
                 document.body.removeChild(input);

                showbox("成功复制到剪切板!");
            })
            
           
           
           
        }
        else
        {
            showbox("不符合规范的队伍信息!");
            //打印创建失败
        }
    })
