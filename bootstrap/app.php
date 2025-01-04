<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Spatie\Permission\Middleware\RoleMiddleware;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ])
        // ->validateCsrfTokens(except: [
        //     'payments/callback',
        // ])
        ->alias(aliases: [
            'role' => RoleMiddleware::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function(Response $response, Throwable $exection, Request $request){
            if(!app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])){
                return inertia('ErrorHandling', [
                    'status' => $response->getStatusCode()
                ])->toResponse($request)->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'This page get expired, please try again.'
                ]);
            }
            return $response;
        });
    })->create();
