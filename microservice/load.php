<?php
header("Access-Control-Allow-Origin: *");
function formatBytes($bytes, $precision = 2) {
	$units = array('B', 'KB', 'MB', 'GB', 'TB');

	$bytes = max($bytes, 0);
	$pow = floor(($bytes ? log($bytes) : 0) / log(1024));
	$pow = min($pow, count($units) - 1);

	// Uncomment one of the following alternatives
	//$bytes /= pow(1024, $pow);
	$bytes /= (1 << (10 * $pow));
	return round($bytes, $precision) . ' ' . $units[$pow];
}
function getUptime(){
	$str   = @file_get_contents('/proc/uptime');
	$num   = floatval($str);
	$secs  = fmod($num, 60); $num = (int)($num / 60);
	$mins  = $num % 60;      $num = (int)($num / 60);
	$hours = $num % 24;      $num = (int)($num / 24);
	$days  = $num;
	return $days;
}
$load = sys_getloadavg();
$free_disk = disk_free_space("/");
$total_disk = disk_total_space("/");
$formatted_free_disk = formatBytes($free_disk, 2);
$formatted_total_disk = formatBytes($total_disk, 2);
$json->load = $load;
$json->free_disk = $free_disk;
$json->total_disk = $total_disk;
$json->formatted_free_disk = $formatted_free_disk;
$json->formatted_total_disk = $formatted_total_disk;
$json->uptime = getUptime();
$encoded = json_encode($json);
echo $encoded;

?>
