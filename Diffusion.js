account = `sk-KSdKkKeklLfmXrDAkQkrKKY638vsy0u9YshvujssDaj13BIT`
$(document).on('click', '#Random', function(){
    document.getElementById('seed').value = Math.floor(Math.random() * 1000000)
})
$(document).on('click', '#Generate', function (){
    var prompt = {}
    var postprompt = {}
    var negprompt = {}
    let engine_id = null
    params = ["height", "width", "cfg_scale", "sampler", "samples", "seed", "steps", "style_preset"]
    engine_id = document.getElementById("model-select").value
    let input = document.getElementById("prompting").value
    let neginput = document.getElementById("negative-prompting").value
    let postweight = document.getElementById("post-weight").value
    let negweight = document.getElementById("neg-weight").value
    let height = document.getElementById("height").value
    let width = document.getElementById("width").value
    let cfg = document.getElementById("cfg_scale").value
    postprompt["text"] = input
    postprompt["weight"] = parseFloat(postweight)
    negprompt["text"] = neginput
    negprompt["weight"] = parseFloat(negweight)
    prompt["text_prompts"] = [postprompt, negprompt]
    debugger
    for (const pa of params) {
        console.log(pa)
        if (pa == "height" || pa == "width" || pa == "cfg_scale" || pa == "samples" || pa == "seed" || pa == "steps"){
            prompt[pa] = parseInt(document.getElementById(`${pa}`).value)
        }
        else{
        prompt[pa] = document.getElementById(`${pa}`).value;
        }
    }
    if (height > 1024 || height < 128 || !height || height == 'null'){
        $("#height").addClass('red')
        $("#height").attr('title', 'Giá trị bạn vừa nhập phải lớn hơn 128 và bé hơn 1024')
        return 
    }
    else if (width > 1024 || width < 128 || !width || width == 'null'){
        $("#width").addClass('red')
        $("#width").attr('title', 'Giá trị bạn vừa nhập phải lớn hơn 128 và bé hơn 1024')
        return 
    }
    else if (cfg > 35 || cfg < 0 || !cfg || cfg == 'null'){
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