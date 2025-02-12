<script setup>

</script>

<template>
<body class="bg-gray-100 p-4">
    <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b pb-2 mb-4">
            <div class="flex space-x-4">
                <a href="#" class="text-blue-600 font-semibold border-b-2 border-blue-600">Campaigns</a>
                <a href="#" class="text-gray-600 font-semibold">Conversions</a>
            </div>
        </div>
        <div class="flex justify-between items-center mb-4">
            <div class="flex space-x-4">
                <input type="text" value="Sunday,12-01-2025" class="border rounded p-2">
                <button class="border rounded p-2"><i class="fas fa-calendar-alt"></i></button>
                <input type="text" value="Wednesday,12-02-2025" class="border rounded p-2">
                <button class="border rounded p-2"><i class="fas fa-calendar-alt"></i></button>
            </div>
            <button class="bg-black text-white rounded p-2">Show Statistics</button>
        </div>
        <div class="flex justify-between mb-4">
            <div class="flex space-x-4">
                <div>
                    <div class="text-center font-semibold mb-2">January, 2025</div>
                    <div class="grid grid-cols-7 gap-1 text-center">
                        <div class="font-semibold">MO</div>
                        <div class="font-semibold">TU</div>
                        <div class="font-semibold">WE</div>
                        <div class="font-semibold">TH</div>
                        <div class="font-semibold">FR</div>
                        <div class="font-semibold">SA</div>
                        <div class="font-semibold">SU</div>
                        <div class="text-gray-400">30</div>
                        <div class="text-gray-400">31</div>
                        <div class="bg-blue-100">1</div>
                        <div class="bg-blue-100">2</div>
                        <div class="bg-blue-100">3</div>
                        <div class="bg-blue-100">4</div>
                        <div class="bg-blue-100">5</div>
                        <div class="bg-blue-200">6</div>
                        <div class="bg-blue-200">7</div>
                        <div class="bg-blue-200">8</div>
                        <div class="bg-blue-200">9</div>
                        <div class="bg-blue-200">10</div>
                        <div class="bg-blue-200">11</div>
                        <div class="bg-blue-200">12</div>
                        <div class="bg-blue-300">13</div>
                        <div class="bg-blue-300">14</div>
                        <div class="bg-blue-300">15</div>
                        <div class="bg-blue-300">16</div>
                        <div class="bg-blue-300">17</div>
                        <div class="bg-blue-300">18</div>
                        <div class="bg-blue-300">19</div>
                        <div class="bg-blue-400">20</div>
                        <div class="bg-blue-400">21</div>
                        <div class="bg-blue-400">22</div>
                        <div class="bg-blue-400">23</div>
                        <div class="bg-blue-400">24</div>
                        <div class="bg-blue-400">25</div>
                        <div class="bg-blue-400">26</div>
                        <div class="bg-blue-500">27</div>
                        <div class="bg-blue-500">28</div>
                        <div class="bg-blue-500">29</div>
                        <div class="bg-blue-500">30</div>
                        <div class="bg-blue-500">31</div>
                        <div class="bg-blue-100">1</div>
                        <div class="bg-blue-100">2</div>
                    </div>
                </div>
                <div>
                    <div class="text-center font-semibold mb-2">February, 2025</div>
                    <div class="grid grid-cols-7 gap-1 text-center">
                        <div class="font-semibold">MO</div>
                        <div class="font-semibold">TU</div>
                        <div class="font-semibold">WE</div>
                        <div class="font-semibold">TH</div>
                        <div class="font-semibold">FR</div>
                        <div class="font-semibold">SA</div>
                        <div class="font-semibold">SU</div>
                        <div class="text-gray-400">27</div>
                        <div class="text-gray-400">28</div>
                        <div class="text-gray-400">29</div>
                        <div class="text-gray-400">30</div>
                        <div class="text-gray-400">31</div>
                        <div class="bg-blue-100">1</div>
                        <div class="bg-blue-100">2</div>
                        <div class="bg-blue-200">3</div>
                        <div class="bg-blue-200">4</div>
                        <div class="bg-blue-200">5</div>
                        <div class="bg-blue-200">6</div>
                        <div class="bg-blue-200">7</div>
                        <div class="bg-blue-200">8</div>
                        <div class="bg-blue-300">9</div>
                        <div class="bg-blue-300">10</div>
                        <div class="bg-blue-300">11</div>
                        <div class="bg-blue-300">12</div>
                        <div class="bg-blue-300">13</div>
                        <div class="bg-blue-300">14</div>
                        <div class="bg-blue-300">15</div>
                        <div class="bg-blue-300">16</div>
                        <div class="bg-blue-400">17</div>
                        <div class="bg-blue-400">18</div>
                        <div class="bg-blue-400">19</div>
                        <div class="bg-blue-400">20</div>
                        <div class="bg-blue-400">21</div>
                        <div class="bg-blue-400">22</div>
                        <div class="bg-blue-400">23</div>
                        <div class="bg-blue-500">24</div>
                        <div class="bg-blue-500">25</div>
                        <div class="bg-blue-500">26</div>
                        <div class="bg-blue-500">27</div>
                        <div class="bg-blue-500">28</div>
                        <div class="bg-blue-100">1</div>
                        <div class="bg-blue-100">2</div>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <div class="font-semibold">Total Sent <span class="font-normal">0</span></div>
                <div class="font-semibold">Total Recipients <span class="font-normal">0</span></div>
                <div class="text-blue-600">Total Opened <span class="font-normal">0</span></div>
                <div class="text-green-600">Total Clicked <span class="font-normal">0</span></div>
                <div class="text-red-600">Total Unsubscribed <span class="font-normal">0</span></div>
                <div class="text-green-600">Total Replied <span class="font-normal">0</span></div>
                <div class="text-red-600">Total Soft + Hard Bounces <span class="font-normal">0</span></div>
            </div>
        </div>
        <div class="flex justify-between mb-4">
            <div class="bg-blue-500 text-white rounded p-4 text-center w-1/3">
                <div class="font-semibold">Open Rate <i class="fas fa-info-circle"></i></div>
                <div class="text-2xl font-bold">0</div>
                <div>Details</div>
            </div>
            <div class="bg-green-500 text-white rounded p-4 text-center w-1/3">
                <div class="font-semibold">Click Rate <i class="fas fa-info-circle"></i></div>
                <div class="text-2xl font-bold">0</div>
            </div>
            <div class="bg-orange-500 text-white rounded p-4 text-center w-1/3">
                <div class="font-semibold">Unsubscription Rate <i class="fas fa-info-circle"></i></div>
                <div class="text-2xl font-bold">0</div>
            </div>
        </div>
        <div>
            <div class="font-semibold mb-2">Email Campaigns</div>
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border p-2">ID</th>
                        <th class="border p-2">NAME</th>
                        <th class="border p-2">RECIPIENTS</th>
                        <th class="border p-2">OPENED</th>
                        <th class="border p-2">CLICKED</th>
                        <th class="border p-2">UNSUBSCRIBED</th>
                        <th class="border p-2">COMPLAINTS</th>
                        <th class="border p-2">BOUNCES <i class="fas fa-info-circle"></i></th>
                        <th class="border p-2">SENT DATE</th>
                        <th class="border p-2">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border p-2 text-center" colspan="10">No Stats Found</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</template>

<style  scoped>

</style>

