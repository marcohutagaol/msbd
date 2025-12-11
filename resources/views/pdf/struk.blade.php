<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-size: 12px; font-family: Arial; }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .line { border-bottom: 1px dashed #000; margin: 8px 0; }
        table { width: 100%; }
        td { padding: 3px 0; }
    </style>
</head>
<body>

<div class="center bold">KAWALAND RESORT</div>
<div class="center">INVOICE PEMBELIAN</div>
<div class="line"></div>

<p>Invoice: <strong>{{ $invoice->invoice_number }}</strong></p>
<p>Total: <strong>Rp {{ number_format($invoice->total_harga, 0, ',', '.') }}</strong></p>

<div class="line"></div>

<table>
    @foreach ($invoice->purchases as $item)
    <tr>
        <td>{{ $item->nama_barang }} ({{ $item->jumlah }}x)</td>
        <td style="text-align:right;">
            Rp {{ number_format($item->total_harga,0,',','.') }}
        </td>
    </tr>
    @endforeach
</table>

<div class="line"></div>
<div class="center">Terima kasih!</div>

</body>
</html>
