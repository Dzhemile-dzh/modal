<?php
include('api.php');
$accessToken = fetchAccessToken();
$tasks = fetchTasks($accessToken);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/styles.css">
    <script defer src="assets/script.js"></script>
    <title>Task Table</title>
</head>
<body>
    <h1>Task Table</h1>
    <input type="text" id="search" placeholder="Search..." onkeyup="filterTable()">
    <table id="taskTable">
        <thead>
            <tr>
                <th>Task</th>
                <th>Title</th>
                <th>Description</th>
                <th>Color</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($tasks as $task): ?>
                <tr>
                    <td><?= htmlspecialchars($task['task']) ?></td>
                    <td><?= htmlspecialchars($task['title']) ?></td>
                    <td><?= htmlspecialchars($task['description']) ?></td>
                    <td style="background-color: <?= htmlspecialchars($task['colorCode']) ?>;">
                        <?= htmlspecialchars($task['colorCode']) ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <button id="openModal">Add Image</button>
    <?php include('modal.php'); ?>
</body>
</html>
