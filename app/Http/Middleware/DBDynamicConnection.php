<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DBDynamicConnection
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    if (Auth::check()) {
      $role = Auth::user()->role;

      switch ($role) {
        case 'admin':
          Config::set('database.default', 'mysql_admin');
          break;
        case 'karyawan':
          Config::set('database.default', 'mysql_user');
          break;
        case 'manager':
          Config::set('database.default', 'mysql_manager');
          break;
        case 'purchaser':
          Config::set('database.default', 'mysql_purchaser');
          break;
        default:
          Config::set('database.default', 'mysql');
          break;
      }

      // Reconnect untuk memastikan koneksi berubah
      DB::reconnect();
    }

    return $next($request);
  }
}