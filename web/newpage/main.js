var token=getCookie('token');
var username=getCookie('username');//登陆后传入
var mybody='';
var inteam=false;//是否在队伍中
var iscaptain=null;//是否为队长
var teamid=null;//队伍的id是多少
var myid=null;
    function check()//检查此用户是否已经拥有队伍(创建队伍||加入队伍)
    {
        fetch("http://58.87.111.176/api/users",
        {
            method:'GET',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token
            }
        }).then(response=>
        {
            if(response.ok)
            {
                return response.json();
            }
        }).then(res=>
        {
            mybody=res;
            console.log(mybody);
            for(var i=0;i<mybody.length;i++)
            {
                if(mybody[i]['username']==username)
                {
                    myid=mybody[i]['id'];
                    console.log(mybody[i]['username']);
                    if(mybody[i]['team']==null)
                    {
                        inteam=false;
                    }
                    else 
                    {
                        teamid=mybody[i]['team']['id'];
                        inteam=true;
                        if(mybody[i]['team']['isCaptain']===true)iscaptain=true;
                        else iscaptain=false;
                    }
                    console.log(inteam);
                    break;
                }
                
            }

            //传入一系列东西
            setCookie("inteam",inteam);//是否在队伍中
            setCookie("iscaptain",iscaptain);//是否为队长
            setCookie("teamid",teamid);//队伍的id是多少
            setCookie("myid",myid);
            init();
        })
       

        /*
        *******************待完善
        ************************
        // */
        //  return false;
        // return true;
    }
    check();
    
    function init()
    {
        //check();
        if(inteam===false)//检查已经登陆的账号是否在数据库中（是否已经有队伍）     如果没有队伍，显示创建队伍或加入队伍
        {
            var bt1=document.getElementsByTagName("button")[0];
            var bt2=document.getElementsByTagName("button")[1];
            
            bt1.addEventListener("click",function(){window.location.href='creatteam.html';});
            bt2.addEventListener("click",function(){window.location.href='jointeam.html';});
        }
        else//显示查看队伍信息和退出队伍
        {
            var bt1=document.getElementsByTagName("button")[0];
            var bt2=document.getElementsByTagName("button")[1];
            var bt3=document.getElementsByTagName("button")[2];
            var bt4=document.getElementsByTagName("button")[3];
            bt1.style.display='none';
            bt2.style.display='none';
            bt3.style.display='inline';
            bt4.style.display='inline';
            if(iscaptain===true)bt4.innerHTML="解散队伍";

            bt3.addEventListener("click",function(){window.location.href='teaminfor.html';});//查看队伍信息
            //退出队伍
            bt4.addEventListener("click",function(){
                /*
                ****************************************
                ***********************待完善，删除队伍信息
                */
                //var makeconfirm;
                var noteword="如果确认";
                if(iscaptain===false)noteword+="退出";
                else noteword+="解散";
                noteword+="队伍，请输入:";
                if(iscaptain==false)noteword+="Exit";
                else noteword+="Clear"
                inputbox(noteword,function()
                 {
                    var makeconfirm=document.getElementsByClassName("setinput")[0].value;
                    if((iscaptain===true&&makeconfirm==="Clear")||(iscaptain===false&&makeconfirm==="Exit"))
                    {
                        //删除队伍信息
                        /*
                        *************
                        待完善
                        ************
                        */
                        if(iscaptain===true)//解散队伍，即删除队伍
                        {
                            dissolve(function()
                            {
                                showbox("成功解散队伍!",function()
                                {
                                    //点击后刷新页面
                                    location.reload(true);   
                                });
                            });
                        }
                        else//个人退出，删掉该人的队伍信息
                        {
                            letitgo(function()
                            {
                                showbox("成功退出队伍!",function()
                                {
                                    //点击后刷新页面
                                    location.reload(true);   
                                });
                            });
                        }

                        //document.getElementsByClassName("showinfor")[0].style.display="block";
                    }
                    else
                    {
                        showbox("操作失败!",function()
                    {
                        //alert("退出失败");
                    });
                    }
                 });
                
                
            });
        }
    }


    function dissolve(callback)
    {
        fetch("http://58.87.111.176/api/auth",
        {
            method:'POST',
            headers:
            {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                    'username':'admin',
                    'password':'eesast-software'
                }
            )
        }).then(response=>
        {
            return response.json();
        }).then(res=>
        {
            var newtoken=res['token'];
            //得到新的token，删除id的队伍 teamid
            console.log(teamid);
            fetch("http://58.87.111.176/api/teams/"+teamid,
            {
                method:'DELETE',
                headers:
                {
                    'Content-Type':'application/json',
                    'x-access-token':newtoken.toString()
                }
            }).then(response=>
            {
                if(response.ok===true)
                {
                    if(callback&&typeof(callback)==="function")
                    {
                        callback();
                    }
                }
            },error=>
            {
                showbox("操作失败，请稍后再试!");
            })
        })

        
    }


    function letitgo(callback)
    {
        
            console.log(teamid);
            fetch("http://58.87.111.176/api/teams/"+teamid+"/members/"+myid,
            {
                method:'DELETE',
                headers:
                {
                    'Content-Type':'application/json',
                    'x-access-token':token.toString()
                }
            }).then(response=>
            {
                if(response.ok===true)
                {
                    if(callback&&typeof(callback)==="function")
                    {
                        callback();
                    }
                }
            },error=>
            {
                showbox("操作失败，请稍后再试!");
            })
    
        
        // if(callback&&typeof(callback)==="function")
        // {
        //     callback();
        // }
    }
   
    









    function setCookie(cname,cvalue){
        // var d = new Date();
        // d.setTime(d.getTime()+(exdays*24*60*60*1000));
        // var expires = "expires="+d.toGMTString();
        document.cookie = cname+"="+cvalue;
    }
    function getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
        }
        return "";
    }
    