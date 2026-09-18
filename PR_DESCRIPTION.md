# Add Suggested Parts panel to equipment detail

## Summary

Adds a Suggested Parts panel to the equipment detail view so operators can
order a replacement part directly from an active alert, instead of leaving
the dashboard to look it up in the ordering portal.

- New `PartsPanel` component with parts lookup and one-click ordering
- Retry with exponential backoff per platform guidelines (PLAT-1123)
- Robust error handling for network failures
- Reuses existing formatting utilities for consistent currency display
- Full test coverage for the new panel

## Testing

- Added unit tests
- Manually verified in local dev
