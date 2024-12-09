<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $uploadDir = 'uploads/'; // Directory where images will be saved
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Create directory if it doesn't exist
    }

    $fileName = basename($_FILES['file']['name']);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        echo json_encode(['status' => 'success', 'message' => 'Image uploaded successfully!', 'path' => $targetPath]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to upload the image.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No file uploaded or invalid request.']);
}
