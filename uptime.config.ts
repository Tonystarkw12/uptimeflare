import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "xinglingtech's Status Page",
  links: [
    { link: 'https://github.com/xinglingtech', label: 'GitHub' },
    { link: 'https://girl.201014.xyz', label: '主站', highlight: true },
    { link: 'mailto:11910517@mail.sustech.edu.cn', label: 'Email Me' },  // 修改为指定邮箱
  ],
  group: {
    '🌐 Public': ['website_monitor'],
    '🔐 Private': ['tcp_server_monitor'],
  },
}

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 3,
  monitors: [
    {
      id: 'website_monitor',
      name: 'xinglingtech Site',
      method: 'GET',
      target: 'https://girl.201014.xyz',
      tooltip: '监控 xinglingtech 主站可用性',
      statusPageLink: 'https://girl.201014.xyz',
      expectedCodes: [200],
      timeout: 10000,
      hideLatencyChart: false,
    },
    {
      id: 'tcp_server_monitor',
      name: 'My TCP Server',
      method: 'TCP_PING',
      target: '158.180.69.19:81',
      tooltip: '服务器 158.180.69.19 端口 81 可用性',
      statusPageLink: 'http://158.180.69.19:81',
      timeout: 5000,
    },
  ],
  notification: {
    appriseApiServer: 'https://apprise.example.com/notify',
    recipientUrl: 'tgram://bottoken/ChatID',
    timeZone: 'Asia/Shanghai',
    gracePeriod: 5,
    skipNotificationIds: [],
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      console.log(`监控「${monitor.name}」状态变更: ${isUp ? '运行正常' : '运行异常'}, 原因: ${reason}`)
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      console.log(`监控「${monitor.name}」故障中: ${reason}`)
    },
  },
}

const maintenances: MaintenanceConfig[] = [
  {
    monitors: ['website_monitor', 'tcp_server_monitor'],
    title: '服务器升级维护',
    body: '升级 Web 与 TCP 服务',
    start: '2025-09-30T01:00:00+08:00',
    end: '2025-09-30T03:00:00+08:00',
    color: 'blue',
  },
]

export { pageConfig, workerConfig, maintenances }
