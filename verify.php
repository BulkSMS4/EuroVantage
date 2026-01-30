<?php
header("Content-Type: application/json");

// PAYPAL CREDENTIALS
$clientId = "PAYPAL_CLIENT_ID";
$clientSecret = "PAYPAL_CLIENT_SECRET";

// READ ORDER ID
$data = json_decode(file_get_contents("php://input"), true);
$orderID = $data["orderID"];

// GET ACCESS TOKEN
$ch = curl_init("https://api-m.paypal.com/v1/oauth2/token");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_USERPWD => $clientId . ":" . $clientSecret,
  CURLOPT_POSTFIELDS => "grant_type=client_credentials",
  CURLOPT_HTTPHEADER => [
    "Accept: application/json",
    "Accept-Language: en_US"
  ]
]);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);

$accessToken = $response["access_token"];

// VERIFY ORDER
$ch = curl_init("https://api-m.paypal.com/v2/checkout/orders/$orderID");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
  ]
]);
$order = json_decode(curl_exec($ch), true);
curl_close($ch);

// CHECK PAYMENT
if (
  $order["status"] === "COMPLETED" &&
  $order["purchase_units"][0]["amount"]["value"] == "50.00"
) {
  echo json_encode([
    "status" => "success",
    "transaction_id" => $order["id"]
  ]);
} else {
  echo json_encode([
    "status" => "failed"
  ]);
}
