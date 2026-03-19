#!/bin/bash

URL="https://phase2-soap-batch-and-vendor-mgmt.vercel.app/api/sync-sheet"
API_KEY="d9b1c8e5-7a3b-4c8e-9f0a-2b1c3d4e5f6a"

echo "🚀 Sending fixed test payload..."

curl -X POST "$URL" \
     -H "Content-Type: application/json" \
     -H "x-api-key: $API_KEY" \
     -d '{
       "sheetId": "TEST-101",
       "name": "Cinnamon Orange Soap",
       "recipe": "Standard Vegan",
       "onHandLabeled": 12,
       "onHandUnlabeled": 5,
       "madeDate": "2026-03-15T12:00:00Z",
       "readyDate": "2026-04-15T12:00:00Z",
       "notes": "Testing the sync from bash script"
     }'

echo -e "\n\n✅ Test complete."