const FiveBoosts = require('fiveboosts-sdk');

// Initialize with your secure RSA Server Token
const booster = new FiveBoosts({
    token: 'YOUR_FIVEBOOSTS_RSA_TOKEN'
});

async function runStressTest() {
    console.log("Triggering automated load test via FiveBoosts Hook...");
    
    // Scale up to 50 bots in Drive Mode (heavy vehicle & physics sync)
    await booster.scaleUnits(50, 'DRIVE');
    
    // Check server telemetry after 15 seconds
    setTimeout(async () => {
        const telemetry = await booster.getServerTelemetry();
        console.log(`Current Server FPS under load: ${telemetry.fps}`);
        
        if (telemetry.fps < 30) {
            console.log("🚨 Server critical! Triggering Emergency Stop...");
            await booster.emergencyStop();
        }
    }, 15000);
}

runStressTest();
