using System.Net.WebSockets;

namespace AtomBridge.Services;

public interface IWebSocketHandler {
    /// <summary>
    /// Handles an incoming WebSocket connection.
    /// </summary>
    Task HandleWebSocketAsync(WebSocket webSocket, CancellationToken cancellationToken);

    /// <summary>
    /// Processes a message received from the WebSocket.
    /// </summary>
    Task ProcessMessageAsync(WebSocket webSocket, string message, CancellationToken cancellationToken);

    /// <summary>
    /// Handles error during WebSocket communication.
    /// </summary>
    Task HandleErrorAsync(Exception exception, WebSocket webSocket);

    /// <summary>
    /// Allows to send a message to a WebSocket client.
    /// </summary>
    Task SendMessageAsync(WebSocket webSocket, byte[] message, CancellationToken cancellationToken);

    /// <summary>
    /// Closes the WebSocket connection gracefully.
    /// </summary>
    Task CloseConnectionAsync(WebSocket webSocket, WebSocketCloseStatus closeStatus, string statusDescription,
        CancellationToken cancellationToken);
}