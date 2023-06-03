account = `sk-bO1o08nghUYsgn8OqwCJhqm2YOu0C4nUsBujnRFSjoqQBSvY`
$(document).on('click', '#Random', function(){
    document.getElementById('seed').value = Math.floor(Math.random() * 1000000)
})
var height = null
var width = null
$(document).on('click', '#dimensions', function (){
    $(this).toggleClass('focus')
    height = 512
    width = 768
})
$(document).on('click', '#Generate', function (){
    var prompt = {}
    var postprompt = {}
    var negprompt = {}
    let engine_id = null
    params = ["cfg_scale", "sampler", "samples", "seed", "steps", "style_preset"]
    engine_id = document.getElementById("model-select").value
    let input = document.getElementById("prompting").value
    let neginput = document.getElementById("negative-prompting").value
    let postweight = document.getElementById("post-weight").value
    let negweight = document.getElementById("neg-weight").value
    let cfg = document.getElementById("cfg_scale").value
    postprompt["text"] = input
    postprompt["weight"] = parseFloat(postweight)
    negprompt["text"] = neginput
    negprompt["weight"] = parseFloat(negweight)
    prompt["text_prompts"] = [postprompt, negprompt]
    prompt["height"] = height
    prompt["width"] = width
    for (const pa of params) {
        console.log(pa)
        if (pa == "cfg_scale" || pa == "samples" || pa == "seed" || pa == "steps"){
            prompt[pa] = parseInt(document.getElementById(`${pa}`).value)
        }
        else{
        prompt[pa] = document.getElementById(`${pa}`).value;
        }
    }
    if (cfg > 35 || cfg < 0 || !cfg || cfg == 'null'){
        $("#cfg_scale").addClass('red')
        $("#cfg_scale").attr('title', 'Giá trị bạn vừa nhập phải lớn hơn 0 và bé hơn 35')
        return 
    }
    else{
    $.ajax({
        type: "POST",
        async: true,
        url: `https://api.stability.ai/v1/generation/${engine_id}/text-to-image`,
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${account}`,
            "Accept": "application/json"
        },
        data: JSON.stringify(prompt),
        success: function (res){
            console.log(res)
            image = res['artifacts'][0].base64
            document.getElementById("display").innerHTML = `<img class="Image" src="data:image/jpeg;base64,${image}">`
            debugger
        }
    })
    }
})
$("textarea").each(function () {
  this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
});