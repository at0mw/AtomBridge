using System.Net.WebSockets;
using System.Text;

namespace AtomBridge.Services;

public class WebSocketHandler(ILogger<WebSocketHandler> logger) : IWebSocketHandler {
    public async Task HandleWebSocketAsync(WebSocket webSocket, CancellationToken cancellationToken)
        {
            logger.LogInformation("WebSocket connection established");

            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationToken);

            while (!result.CloseStatus.HasValue)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                await ProcessMessageAsync(webSocket, message, cancellationToken);

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationToken);
            }

            if (result.CloseStatusDescription != null)
                await CloseConnectionAsync(webSocket, result.CloseStatus.Value, result.CloseStatusDescription,
                    cancellationToken);
        }

        public async Task ProcessMessageAsync(WebSocket webSocket, string message, CancellationToken cancellationToken)
        {
            logger.LogInformation("Received message: {message}", message);

            // You can process different message types here
            var response = Encoding.UTF8.GetBytes($"Echo: {message}");
            await SendMessageAsync(webSocket, response, cancellationToken);
        }

        public async Task HandleErrorAsync(Exception exception, WebSocket webSocket)
        {
            logger.LogError(exception, "Error occurred during WebSocket communication");

            // Handle the error, perhaps send an error message to the client
            var response = Encoding.UTF8.GetBytes("Error occurred. Please try again later.");
            await SendMessageAsync(webSocket, response, CancellationToken.None);
        }

        public async Task SendMessageAsync(WebSocket webSocket, byte[] message, CancellationToken cancellationToken)
        {
            await webSocket.SendAsync(new ArraySegment<byte>(message), WebSocketMessageType.Text, true, cancellationToken);
        }

        public async Task CloseConnectionAsync(WebSocket webSocket, WebSocketCloseStatus closeStatus, string statusDescription, CancellationToken cancellationToken)
        {
            await webSocket.CloseAsync(closeStatus, statusDescription, cancellationToken);
            logger.LogInformation("WebSocket connection closed");
        }
    }