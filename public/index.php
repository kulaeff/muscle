<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

define('PUBLIC_DIR', dirname(__FILE__));
define('ROOT_DIR', dirname(PUBLIC_DIR . '../'));

$config = [
    'templates.path' => ROOT_DIR . '/views',
];

$app = new \Slim\App($config);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    return new \Slim\Views\PhpRenderer($container->get('templates.path'));
};

$app->get('/{params:.*}', function (Request $request, Response $response) {
    return $this->view->render($response, 'index.html');
});

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->run();