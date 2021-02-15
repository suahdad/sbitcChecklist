import { _ViewRepeaterOperation } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { VoucherService } from './voucher.service';

describe('VoucherService', () => {
  let service: VoucherService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(VoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get vouchers', async () => {
    var _voucher
    // service.getVoucher('tosadmin').subscribe(x => _voucher = x).add(console.log('sub finished'))
    await service.getVoucher('tosadmin').toPromise().then(x => {
      _voucher = x
    });
    expect(_voucher).toBeTruthy();
  })

  it('should save voucher', async (done) => {
    const user = 'tosadmin';
    const equip = 'SS01'
    
    var _postMsg;
    var _voucher;
    await service.postVoucher(user , equip).toPromise().then(x => _postMsg = x);
    await service.getVoucher(user).toPromise().then(x => _voucher = x[0])
    expect(Date.parse(_voucher.validity)).toBeGreaterThan(Date.now());
    done();
  })
});
