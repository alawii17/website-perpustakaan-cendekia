<?php

use App\Models\User;

if (!function_exists('flashMessage')) {
    function flashMessage($message, $type = 'success'): void
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}

if (!function_exists('usernameGenerator')){
    function usernameGenerator(string $name): string
    {
        $username = strtolower(preg_replace('/\s+/', '_', trim($name)));
        $original_username = $username;
        $count = 1;

        while(User::where('username', $username)->exists()){
            $username = $original_username . $count;
            $count++;
        }

        return $username;
    }
}

if (!function_exists('signatureMidtrans')){
    function signatureMidtrans($order_id, $status_code, $gross_amount, $server_key)
    {
        return hash('sha512', $order_id . $status_code . $gross_amount . $server_key);
    }
}