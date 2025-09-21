const LOG_SERVER_URL = "http://20.244.56.144/evaluation-service/logs"; // replace with actual Test Server endpoint

export async function Log(stack, level, packageName, message)
{
      const payload = {
            stack,
            level,
            package: packageName,
            message,
            timestamp: new Date().toISOString(),
      };

      try {
            await fetch(LOG_SERVER_URL, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
            });
            console.log(`[Log - ] ${level}: ${message}`);
      } catch (error) {
            console.error("Log could not be send - ", error);
      }
}
