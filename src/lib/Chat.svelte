<script>
    let text = $state("");
    let result = $state(null);
  
    $effect(() => {
        if (text !== "") {
            const params = new URLSearchParams();
            params.append("text", text);
            const url = "/api/chat?" + params.toString();
        
            fetch(url).then(async (res) => {
                result = await res.json();
            });
        }
    });
</script>

<div class="absolute w-full h-full">

    <div class="w-[600px] max-w-[80%] max-h-[50px] mx-auto flex">
        <input
            on:keydown={(event) => {
                if (event.key === "Enter") {
                    text = event.currentTarget.value;
                    console.log(text);
                }
            }}
            class="scrollbar-thin w-[550px] px-3 py-3 rounded-lg bg-transparent text-gray-800"
            placeholder="Type your message..."
        />

        <textarea class="scrollbar-thin w-[550px] px-3 py-3 rounded-lg bg-transparent text-gray-800">
            {result ? result : ""}
        </textarea>            
    </div>
   
</div>