function buy(packageName) {
    fetch("https://minecraft-webhook.vercel.app/webhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            customer_name: prompt("Masukkan username Minecraft kamu:"),
            package_name: packageName
        })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}
