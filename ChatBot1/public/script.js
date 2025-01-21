document.addEventListener("DOMContentLoaded", () => {
    let prompt = document.querySelector("#prompt");
    let submitbtn = document.querySelector("#submit");
    let chatContainer = document.querySelector(".chat-container");
    let imagebtn = document.querySelector("#image");
    let image = document.querySelector("#image img");
    let imageinput = document.querySelector("#image input");

    const url = "/api/getResponse"; // Backend endpoint to fetch MySQL responses

    let user = {
        message: null,
        file: {
            mime_type: null,
            data: null
        }
    };

    async function generateResponse(ChatBot1) {
        let text = ChatBot1.querySelector(".ai-chat-area");
        let RequestOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: user.message,
                file: user.file.data ? { mime_type: user.file.mime_type, data: user.file.data } : null
            })
        };

        try {
            // Send the user's message to the backend
            let response = await fetch(url, RequestOption);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json(); // Parse the JSON response from the backend
            console.log('Backend response:', data);

            let dbResponse = data.response ? data.response.trim() : 'No response from the database';
            text.innerHTML = dbResponse; // Display the MySQL response
        } catch (error) {
            console.error('Error:', error);
            text.innerHTML = 'Error fetching response from the database.';
        } finally {
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
            image.src = "img.svg"; // Reset image
            image.classList.remove("choose");
            user.file = {}; // Clear the file data
        }
    }

    function createChatBox(html, classes) {
        let div = document.createElement("div");
        div.innerHTML = html;
        div.classList.add(classes);
        return div;
    }

    function handleChatResponse(userMessage) {
        user.message = userMessage;

        let html = `<img src="user.png" alt="" id="userImage" width="8%">
                    <div class="user-chat-area">
                        ${user.message}
                        ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
                    </div>`;
        prompt.value = ""; // Clear the input field
        let userChatBox = createChatBox(html, "user-chat-box");
        chatContainer.appendChild(userChatBox);

        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

        setTimeout(() => {
            let html = `<img src="ai.png" alt="" id="aiImage" width="10%">
                        <div class="ai-chat-area">
                            <img src="loading.webp" alt="" class="load" width="50px">
                        </div>`;
            let aiChatBox = createChatBox(html, "ai-chat-box");
            chatContainer.appendChild(aiChatBox);
            generateResponse(aiChatBox); // Fetch the response from the backend
        }, 600);
    }

    prompt.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleChatResponse(prompt.value); // Handle enter key press
        }
    });

    submitbtn.addEventListener("click", () => {
        handleChatResponse(prompt.value); // Handle button click
    });

    imageinput.addEventListener("change", () => {
        const file = imageinput.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = (e) => {
            let base64string = e.target.result.split(",")[1];
            user.file = {
                mime_type: file.type,
                data: base64string
            };
            image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
            image.classList.add("choose");
        };

        reader.readAsDataURL(file);
    });

    imagebtn.addEventListener("click", () => {
        imageinput.click(); // Open file input dialog
    });
});
















