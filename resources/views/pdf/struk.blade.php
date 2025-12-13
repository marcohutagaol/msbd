<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-size: 11px;
            font-family: Arial, sans-serif;
            background: white;
        }


        table {
            width: 100%;
            border-collapse: collapse;
        }

        @page {
            size: A4 portrait;
            margin: 20px;
        }

        .page {
            width: 100%;
        }



        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h2 {
            margin: 5px 0;
            font-size: 16px;
        }

        .header p {
            margin: 3px 0;
            font-size: 10px;
        }

        .section-title {
            background-color: #333;
            color: white;
            padding: 5px;
            text-align: center;
            font-weight: bold;
            margin: 15px 0 10px 0;
        }

        .info-table {
            width: 100%;
            margin-bottom: 10px;
        }

        .info-table td {
            padding: 3px 5px;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        .items-table th {
            background-color: #f0f0f0;
            border: 1px solid #333;
            padding: 5px;
            font-weight: bold;
            text-align: center;
        }

        .items-table td {
            border: 1px solid #333;
            padding: 5px;
            text-align: center;
        }

        .items-table td.left {
            text-align: left;
        }

        .items-table td.right {
            text-align: right;
        }

        .total-row {
            font-weight: bold;
        }

        .signature-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .signature-table td {
            border: 1px solid #333;
            padding: 30px 10px 10px 10px;
            text-align: center;
            vertical-align: bottom;
            height: 80px;
        }

        .remarks {
            margin: 15px 0;
            font-weight: bold;
        }

        .date-section {
            margin-top: 10px;
        }
    </style>
</head>

<body>

    <div class="header">
        <h2>KAWALAND GLAMPING RESORT</h2>
        <p>Jl. Wisata Bahari RT 001/RW 001 Km 43, Kelurahan Malang Rapat,</p>
        <p>Kecamatan Gunung Kijang, Kabupaten Bintan, Kepulauan Riau – Indonesia</p>
        <p>Telp +62 81325884343, E-mail : Office@kawaland.id</p>
    </div>

    <div class="section-title">MARKET LIST</div>

    <table class="info-table">
        <tr>
            <td style="width: 20%;">Dept</td>
            <td style="width: 30%;">: Housekeeping</td>
            <td style="width: 20%;">Order Date</td>
            <td style="width: 30%;">: {{ date('d/m/Y') }}</td>
        </tr>
        <tr>
            <td>Dept to charge</td>
            <td>: FINANCE</td>
            <td>Supplier</td>
            <td>: KMS</td>
        </tr>
        <tr>
            <td colspan="4">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="2"><strong>Invoice: {{ $invoice->invoice_number }}</strong></td>
            <td colspan="2"></td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%;">NO</th>
                <th style="width: 35%;">DESCRIPTION</th>
                <th style="width: 10%;">REQ</th>
                <th style="width: 10%;">UNIT</th>
                <th style="width: 15%;">PRICE /UNIT</th>
                <th style="width: 15%;">TOTAL PRICE</th>
                <th style="width: 10%;">KETERANGAN</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoice->purchases as $index => $item)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td class="left">{{ $item->nama_barang }}</td>
                <td>{{ $item->jumlah }}</td>
                <td>pcs</td>
                <td class="right">
                    Rp {{ number_format(($item->jumlah ?? 0) > 0 ? ($item->total_harga / $item->jumlah) : 0, 0, ',', '.') }}
                </td>

                <td class="right">Rp {{ number_format($item->total_harga, 0, ',', '.') }}</td>
                <td></td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="5" class="right">TOTAL PAYMENT</td>
                <td class="right">Rp {{ number_format($invoice->total_harga, 0, ',', '.') }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div class="remarks">REMARKS :</div>

    <table class="signature-table">
        <tr>
            <td style="width: 25%;">
                <div>PREPARED BY</div>
                <div style="margin-top: 40px;">AMAD</div>
            </td>
            <td style="width: 25%;">APPROVED BY</td>
            <td style="width: 25%;">ISSUED BY</td>
            <td style="width: 25%;">RECEIVED BY</td>
        </tr>
    </table>

    <div class="date-section">
        <strong>DATE : {{ date('d F Y') }}</strong>
    </div>

    <div style="text-align: center; margin-top: 30px;">Terima kasih!</div>

</body>

</html>